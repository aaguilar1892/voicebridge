#Run this first!

import os
import pickle

import mediapipe as mp
import cv2
import matplotlib.pyplot as plt

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

# Configure MediaPipe Hands for static images with a maximum of 2 hands.
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.3)

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
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        results = hands.process(img_rgb)
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
                
                
                hands_data.append((min(x_coords), hand_features))
            
            
            hands_data.sort(key=lambda x: x[0])
            
            features_per_hand = [features for (_, features) in hands_data]
            
            if len(features_per_hand) < 2:
                features_per_hand.append([0.0] * FEATURES_PER_HAND)
            
            features_per_hand = features_per_hand[:2]
            
            
            data_aux = features_per_hand[0] + features_per_hand[1]
            data.append(data_aux)
            labels.append(dir_)

# Save the dataset.
with open('data.pickle', 'wb') as f:
    pickle.dump({'data': data, 'labels': labels}, f)
