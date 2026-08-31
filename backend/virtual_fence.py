from typing import List, Tuple

import cv2
import numpy as np


Point = Tuple[int, int]


class VirtualFence:
    def __init__(self, polygon: List[Point]):
        if len(polygon) < 3:
            raise ValueError("A fence requires at least 3 points.")

        self.polygon = polygon

    def is_inside(self, point: Point) -> bool:
        polygon_array = np.array(
            self.polygon,
            dtype=np.int32,
        )

        result = cv2.pointPolygonTest(
            polygon_array,
            point,
            False,
        )

        return result >= 0

    def check_detection(self, detection: dict) -> bool:
        bbox = detection.get("bbox")

        if not bbox or len(bbox) != 4:
            return False

        x1, y1, x2, y2 = bbox

        # Bottom-center of the person's bounding box.
        center_x = int((x1 + x2) / 2)
        bottom_y = int(y2)

        return self.is_inside((center_x, bottom_y))