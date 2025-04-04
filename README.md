# CSCE 3444 - VoiceBridge Project

## Group 12

- Corinna Martin  
- Jake Gonzales  
- Keiran Nelson  
- Adrian Pedraza  
- Mohamed Babiker  
- Alexis Aguilar  

---

## How to Run the Web App

### 1. Backend (Flask)

- Navigate to the backend directory.
- Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

**Install dependencies:**

```bash
pip install -r requirements.txt
```

**Run the Flask server:**

```bash
python app.py # Windows
python3 app.py # MacOS/Linux
```
**The Flask server will run on:**

```arduino
http://localhost:5001
```
Make sure your webcam is on and is accessible

### 2. Frontend (React)

1. Navigate to the frontend directory (e.g., `client` or wherever your React project is located):

    ```bash
    cd client
    ```

2. Install the project dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm run dev
    ```

4. The frontend will be available at:  
   [http://localhost:5173/voicebridge](http://localhost:5173/voicebridge)

## Website Overview

The **Hero** and **About** sections of the VoiceBridge web app serve as a quick and accessible introduction to how the application works.

- **Hero Section**:  
  Provides a high-level introduction to VoiceBridge, emphasizing its mission to bridge communication between sign language users and others using gesture recognition and live translation.

- **About Section**:  
  Offers more detailed information about the technology stack, including how **gesture recognition**, **real-time ASL classification**, and **text-to-speech (TTS)** features are integrated to promote inclusivity.

These sections are designed to be **user-friendly** and **accessible**, with built-in **Text-to-Speech** support for users with visual impairments. When the speaker icon is clicked, the website reads the content aloud to ensure that everyone can understand the purpose and functionality of VoiceBridge.

## Translate Tab

Using your webcam, the app captures American Sign Language (ASL) gestures in real-time. When the user presses the **spacebar** or clicks the **"Capture Letter"** button, the app takes a snapshot of the current hand gesture.

The gesture is then processed through a trained **machine learning model (SVM)** that recognizes ASL letters.

✅ If a valid letter is detected, it's displayed in the textbox below the video feed and visually confirmed with a green checkmark.

❌ If no recognizable gesture is detected, a red X appears, letting the user know to try again.

