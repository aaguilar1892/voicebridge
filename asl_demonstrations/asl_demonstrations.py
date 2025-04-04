import cv2

def show_asl_demonstration(sign_name: str):
    """
    Displays a demonstration video for the given ASL sign
    with high-contrast overlays for low-vision users.
    """
    # Map sign names to video file paths (adjust the paths as needed)
    sign_videos = {
        "Hello": "asl_demonstrations/demonstration_media/hello.mp4",
        "Thank You": "asl_demonstrations/demonstration_media/thank_you.mp4"
        # Add more signs if needed
    }

    if sign_name not in sign_videos:
        print(f"No demonstration video found for sign: {sign_name}")
        return

    video_path = sign_videos[sign_name]
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Could not open video file: {video_path}")
        return

    cv2.namedWindow("ASL Demonstration", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("ASL Demonstration", 800, 600)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Add high-contrast text overlay
        text = f"Demonstrating: {sign_name}"
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 1.2
        color = (255, 255, 255)  # White text
        thickness = 3

        (text_w, text_h), _ = cv2.getTextSize(text, font, font_scale, thickness)
        cv2.rectangle(frame, (0, 0), (text_w + 20, text_h + 20), (0, 0, 0), -1)
        cv2.putText(frame, text, (10, text_h + 10), font, font_scale, color, thickness)

        cv2.imshow("ASL Demonstration", frame)
        if cv2.waitKey(30) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # Example usage:
    show_asl_demonstration("Hello")
    # Uncomment to test another demonstration:
    # show_asl_demonstration("Thank You")
