from pathlib import Path
import time

import cv2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from backend.ai_processor import AIProcessor


BASE_DIR = Path(__file__).resolve().parent.parent
VIDEO_PATH = BASE_DIR / "demo_videos" / "cctv demo footage.mp4"
MODEL_PATH = BASE_DIR / "models" / "yolo26n.pt"


app = FastAPI(
    title="DHRISHTI Backend",
    description="AI-Based Intelligent Video Analytics Platform for Border Surveillance",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


ai_processor = AIProcessor()
ai_enabled = False


@app.on_event("startup")
def start_ai_processor():
    global ai_enabled

    if not MODEL_PATH.exists():
        print(f"WARNING: YOLO model not found: {MODEL_PATH}")
        print("AI processing disabled. Health and CCTV endpoints remain available.")
        ai_enabled = False
        return

    try:
        ai_processor.start()
        ai_enabled = True
        print("AI processor started successfully.")
    except Exception as error:
        print(f"WARNING: AI processor could not start: {error}")
        print("AI processing disabled. Health and CCTV endpoints remain available.")
        ai_enabled = False


@app.on_event("shutdown")
def stop_ai_processor():
    if ai_enabled:
        ai_processor.stop()


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/api/detections")
def get_detections():
    if not ai_enabled:
        return {
            "count": 0,
            "detections": [],
            "ai_enabled": False,
        }

    detections = ai_processor.get_latest_detections()

    return {
        "count": len(detections),
        "detections": detections,
        "ai_enabled": True,
    }


def generate_demo_video():
    if not VIDEO_PATH.exists():
        return

    cap = cv2.VideoCapture(str(VIDEO_PATH))

    if not cap.isOpened():
        cap.release()
        return

    fps = cap.get(cv2.CAP_PROP_FPS)

    if fps <= 0:
        fps = 25.0

    frame_delay = 1.0 / fps

    try:
        while True:
            start_time = time.perf_counter()

            success, frame = cap.read()

            if not success:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                continue

            success, encoded_frame = cv2.imencode(
                ".jpg",
                frame,
                [cv2.IMWRITE_JPEG_QUALITY, 80],
            )

            if not success:
                continue

            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n"
                + encoded_frame.tobytes()
                + b"\r\n"
            )

            elapsed = time.perf_counter() - start_time
            remaining_delay = frame_delay - elapsed

            if remaining_delay > 0:
                time.sleep(remaining_delay)

    finally:
        cap.release()


@app.get("/api/video/demo")
def demo_video():
    return StreamingResponse(
        generate_demo_video(),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )