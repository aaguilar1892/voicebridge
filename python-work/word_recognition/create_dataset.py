#Run this first!

import os
import pickle
import numpy as np
import mediapipe as mp
import cv2
import matplotlib.pyplot as plt

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

# Configure MediaPipe Hands for static images with a maximum of 2 hands.
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.3)

# Initialize MediaPipe Face Detection.
mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

DATA_DIR = './python-work/word_recognition/data'

data = []
labels = []

# Each hand produces 42 features (21 landmarks * 2 coordinates).
FEATURES_PER_HAND = 42

for dir_ in os.listdir(DATA_DIR):
    for img_path in os.listdir(os.path.join(DATA_DIR, dir_)):
        # Read and convert the image.
        img = cv2.imread(os.path.join(DATA_DIR, dir_, img_path))
        if img is None:
            continue
        H, W, _ = img.shape
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        results = hands.process(img_rgb)

        face_results = face_detection.process(img_rgb)
        face_center = None

        if face_results.detections:
            # Use the first detected face.
            detection = face_results.detections[0]
            bbox = detection.location_data.relative_bounding_box
            face_center = (
                int((bbox.xmin + bbox.width / 2) * W),
                int((bbox.ymin + bbox.height / 2) * H)
            )


        if results.multi_hand_landmarks:
            hands_data = []
            # Process each detected hand.
            for hand_landmarks in results.multi_hand_landmarks:
                # Extract x and y coordinates for all 21 landmarks.
                x_coords = [lm.x for lm in hand_landmarks.landmark]
                y_coords = [lm.y for lm in hand_landmarks.landmark]

                
                hand_features = []
                for x, y in zip(x_coords, y_coords):
                    hand_features.extend([x - min(x_coords), y - min(y_coords)])
                
                
                # Here we check the hand's center
                hand_center = (
                    int(np.mean(x_coords) * W),
                    int(np.mean(y_coords) * H)
                )

                hands_data.append((min(x_coords), hand_features, hand_center))
            
            
            hands_data.sort(key=lambda x: x[0])
            
            features_per_hand = [features for (_, features, _) in hands_data]
            hand_centers = [ center for (_, _, center) in hands_data]

            # If only one hand is detected we pad with zeroes
            if len(features_per_hand) < 2:
                features_per_hand.append([0.0] * FEATURES_PER_HAND)

                if len(hand_centers) < 1:
                    hand_centers.append((0, 0))
                else:
                    hand_centers.append(hand_centers[0])
            features_per_hand = features_per_hand[:2]
            hand_centers = hand_centers[:2]
            
            data_aux = features_per_hand[0] + features_per_hand[1]

            relative_offset = 0.0
            if face_center is not None:
                hand_center_for_relative = hand_centers[0]
                # Vertical offset (hand y minus face y) normalized by image height.
                vertical_offset = hand_center_for_relative[1] - face_center[1]
                relative_offset = vertical_offset / H
            
            
            
            
            data_aux.append(relative_offset)
            data.append(data_aux)
            labels.append(dir_)

# Save the dataset.
with open('data.pickle', 'wb') as f:
    pickle.dump({'data': data, 'labels': labels}, f)
