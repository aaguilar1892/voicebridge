# This is to capture more photos for training purposes

import cv2
import os
import time
import uuid

IMAGES_PATH = './python-work/word_recognition/data'
labels = ['Father']
number_imgs = 20  # Number of images to capture for each label

# Create a window to show the webcam feed
cv2.namedWindow("Webcam", cv2.WINDOW_NORMAL)

for label in labels:
    # Create a folder for this label if it doesn't exist
    label_folder = os.path.join(IMAGES_PATH, label)
    os.makedirs(label_folder, exist_ok=True)
    
    cap = cv2.VideoCapture(0)
    print(f'Collecting images for {label}')
    time.sleep(3)  # Wait 5 seconds before capturing

    for imgnum in range(number_imgs):
        ret, frame = cap.read()
        if not ret:
            print("Failed to read from camera. Exiting.")
            break
        
        # Display the frame in the "Webcam" window
        cv2.imshow("Webcam", frame)
        
        # Build an image filename using label and a UUID
        image_name = os.path.join(label_folder, f"{label}.{uuid.uuid1()}.jpeg")
        cv2.imwrite(image_name, frame)
        print(f"Saved {image_name}")
        
        # Wait for 2 seconds (2000 milliseconds). This also allows cv2.imshow() to update.
        if cv2.waitKey(1400) & 0xFF == ord('q'):
            break

    cap.release()

cv2.destroyAllWindows()
print("Image collection complete.")
