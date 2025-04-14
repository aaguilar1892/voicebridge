#Run this third!
import pickle
import cv2
import mediapipe as mp
import numpy as np


model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

# Start video capture.
cap = cv2.VideoCapture(0)

# Initialize MediaPipe Hands with support for up to 2 hands.
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.3
)

# Each hand produces 42 features (21 landmarks x 2 coordinates).
FEATURES_PER_HAND = 42

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    features = None  
    bounding_boxes = [] 

    if results.multi_hand_landmarks:
        hands_data = []
        # Process each detected hand.
        for hand_landmarks in results.multi_hand_landmarks:
            # Extract landmark coordinates.
            x_coords = [lm.x for lm in hand_landmarks.landmark]
            y_coords = [lm.y for lm in hand_landmarks.landmark]
            
            
            hand_features = []
            for x, y in zip(x_coords, y_coords):
                hand_features.extend([x - min(x_coords), y - min(y_coords)])
            
            
            hands_data.append((min(x_coords), hand_features, x_coords, y_coords))

            
            mp_drawing.draw_landmarks(
                frame,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style()
            )
        
        
        hands_data.sort(key=lambda x: x[0])
        
        
        if len(hands_data) == 1:
            
            features = hands_data[0][1] + [0.0] * FEATURES_PER_HAND
        elif len(hands_data) >= 2:
            
            features = hands_data[0][1] + hands_data[1][1]

        
        for _, _, x_coords, y_coords in hands_data[:2]:
            x1 = int(min(x_coords) * W) - 10
            y1 = int(min(y_coords) * H) - 10
            x2 = int(max(x_coords) * W) + 10
            y2 = int(max(y_coords) * H) + 10
            bounding_boxes.append((x1, y1, x2, y2))
    
    if features is not None:
        
        features = np.array(features)
        prediction = model.predict([features])
        predicted_character = prediction[0]
        
        
        cv2.putText(frame, predicted_character, (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3)
        
       
        for (x1, y1, x2, y2) in bounding_boxes:
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 2)
    
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
