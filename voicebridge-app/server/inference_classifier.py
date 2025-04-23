#Run this third!
import pickle
import cv2
import mediapipe as mp
import numpy as np


model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

# Start video capture.
cap = cv2.VideoCapture(1)

# Initialize MediaPipe Hands with support for up to 2 hands.
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.3
)

# Initialize face detection
mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

# Each hand produces 42 features (21 landmarks x 2 coordinates).
FEATURES_PER_HAND = 42

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    frame = cv2.flip(frame, 1)  # Flip the frame horizontally for a mirror effect.    
    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_results = face_detection.process(frame_rgb)
    results = hands.process(frame_rgb)

    #Here we determine if the center of the face is detected. 

    face_center = None
    if face_results.detections:
        
        detection = face_results.detections[0]
        bbox = detection.location_data.relative_bounding_box
        # Compute the face center in pixel coordinates.
        face_center = (
            int((bbox.xmin + bbox.width / 2) * W),
            int((bbox.ymin + bbox.height / 2) * H)
        )
        # Face bounding box
        x1 = int(bbox.xmin * W)
        y1 = int(bbox.ymin * H)
        x2 = int((bbox.xmin + bbox.width) * W)
        y2 = int((bbox.ymin + bbox.height) * H)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)

    features = None  
    hand_center_for_relative = None
    #bounding_boxes = []

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
            
            
            hand_center = (int(np.mean(x_coords) * W), int(np.mean(y_coords) * H))

            hands_data.append((min(x_coords), hand_features, hand_center))

            
            mp_drawing.draw_landmarks(
                frame,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style()
            )
        
        
        hands_data.sort(key=lambda x: x[0])
        
        if len(hands_data) >= 1:
            if len(hands_data) == 1:
                features = hands_data[0][1] + [0.0] * FEATURES_PER_HAND
                hand_center_for_relative = hands_data[0][2]  # set even for one-hand detection
            else:  # two or more hands
                features = hands_data[0][1] + hands_data[1][1]
                hand_center_for_relative = hands_data[0][2]

        """
        if len(hands_data) == 1:
            
            features = hands_data[0][1] + [0.0] * FEATURES_PER_HAND
        elif len(hands_data) >= 2:
            
            features = hands_data[0][1] + hands_data[1][1]

            hand_center_for_relative = hands_data[0][2]"""

        
        
        # Now, if a face is detected, compute the relative vertical offset.
        # For instance, if the hand's center is above the face center, the offset might be negative,
        # and if it is below, the offset might be positive.
        relative_offset = 0.0  # Default value.
        if face_center is not None and hand_center_for_relative is not None:
            # Compute vertical offset in pixels and then normalize by the frame height.
            vertical_offset = hand_center_for_relative[1] - face_center[1]
            relative_offset = vertical_offset / H

            # Optionally, you could also compute horizontal offset if needed:
            # horizontal_offset = (hand_center_for_relative[0] - face_center[0]) / W

            # Draw a line connecting the face center and the hand center.
            cv2.line(frame, face_center, hand_center_for_relative, (0, 255, 0), 2)

        # Append the offset as an additional feature.
        # (Make sure your classifier was trained with this extra feature.)
        features.append(relative_offset)




        """for _, _, x_coords, y_coords in hands_data[:2]:
            x1 = int(min(x_coords) * W) - 10
            y1 = int(min(y_coords) * H) - 10
            x2 = int(max(x_coords) * W) + 10
            y2 = int(max(y_coords) * H) + 10
            bounding_boxes.append((x1, y1, x2, y2))
"""
    if features is not None:
        
        features = np.array(features)
        prediction = model.predict([features])
        predicted_character = prediction[0]
        
        
        cv2.putText(frame, predicted_character, (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3)
        
       
        #for (x1, y1, x2, y2) in bounding_boxes:
            #cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 2)
    
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
