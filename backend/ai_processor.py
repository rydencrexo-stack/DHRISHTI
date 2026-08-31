from pathlib import Path
import threading
import time

import cv2
from ultralytics import YOLO


BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "yolo26n.pt"
VIDEO_PATH = BASE_DIR / "demo_videos" / "cctv demo footage.mp4"


class AIProcessor:
    def __init__(self):
        self.model = None
        self.latest_detections = []
        self.running = False
        self.thread = None
        self.lock = threading.Lock()

    def load_model(self):
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"YOLO model not found: {MODEL_PATH}"
            )

        self.model = YOLO(str(MODEL_PATH))

    def start(self):
        if self.running:
            return

        if self.model is None:
            self.load_model()

        if not VIDEO_PATH.exists():
            raise FileNotFoundError(
                f"Demo video not found: {VIDEO_PATH}"
            )

        self.running = True
        self.thread = threading.Thread(
            target=self._process_video,
            daemon=True,
        )
        self.thread.start()

    def stop(self):
        self.running = False

        if self.thread is not None:
            self.thread.join(timeout=2)

    def get_latest_detections(self):
        with self.lock:
            return list(self.latest_detections)

    def _process_video(self):
        cap = cv2.VideoCapture(str(VIDEO_PATH))

        if not cap.isOpened():
            self.running = False
            return

        try:
            frame_count = 0

            while self.running:
                success, frame = cap.read()

                if not success:
                    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                    continue

                frame_count += 1

                # Process every 5th frame to reduce CPU usage.
                if frame_count % 5 != 0:
                    continue

                try:
                    results = self.model(
                        frame,
                        classes=[0],
                        conf=0.35,
                        verbose=False,
                    )

                    detections = []

                    if results and results[0].boxes is not None:
                        boxes = results[0].boxes

                        for index in range(len(boxes)):
                            bbox = boxes.xyxy[index].tolist()
                            confidence = float(boxes.conf[index].item())
                            class_id = int(boxes.cls[index].item())

                            detections.append(
                                {
                                    "class_name": "person",
                                    "class_id": class_id,
                                    "confidence": confidence,
                                    "bbox": bbox,
                                }
                            )

                    with self.lock:
                        self.latest_detections = detections

                except Exception:
                    # Keep the background processor alive if one
                    # inference fails.
                    continue

                # Small pause prevents the CPU from being consumed
                # continuously by inference.
                time.sleep(0.01)

        finally:
            cap.release()
            self.running = False