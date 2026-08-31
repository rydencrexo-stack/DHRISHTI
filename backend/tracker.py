from pathlib import Path

import cv2
from ultralytics import YOLO


BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "yolo26n.pt"


class ObjectTracker:
    def __init__(self):
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"YOLO model not found: {MODEL_PATH}"
            )

        self.model = YOLO(str(MODEL_PATH))

    def track_people(self, frame):
        results = self.model.track(
            frame,
            persist=True,
            classes=[0],
            conf=0.35,
            verbose=False,
        )

        detections = []

        if not results or results[0].boxes is None:
            return detections

        boxes = results[0].boxes

        for index in range(len(boxes)):
            bbox = boxes.xyxy[index].tolist()
            confidence = float(boxes.conf[index].item())
            class_id = int(boxes.cls[index].item())

            track_id = None

            if boxes.id is not None:
                track_id = int(boxes.id[index].item())

            detections.append(
                {
                    "track_id": track_id,
                    "class_name": "person",
                    "class_id": class_id,
                    "confidence": confidence,
                    "bbox": bbox,
                }
            )

        return detections