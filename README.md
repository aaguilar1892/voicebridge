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

## Practice Mode

The **Practice** tab provides users with three interactive learning modules to strengthen their ASL comprehension and performance:

### Modes

Upon clicking **Practice**, the user is presented with three large, animated buttons for the following modules:

1. **Tutorial Mode**
2. **Flashcards Mode**
3. **Practice Mode**

Each button has the following features:
- Enlarged, rounded styling for accessibility.
- Animated scaling effect on hover to indicate interactivity.
- Text-to-Speech (TTS) playback when hovered, announcing the mode name (e.g., *"Go to flashcards mode"*).

A heading above the buttons reads **“Welcome to Practice Mode”**, and when hovered, it is spoken aloud using TTS.

---

### 1. Tutorial Mode

This mode is designed to **guide users through learning ASL signs step-by-step**. Users are introduced to basic vocabulary, gestures, and visual feedback. Key features include:

- Instructional content
- Large fonts and buttons
- Optional voice guidance via TTS

---

### 2. Flashcards Mode

Flashcards provide a **visual and auditory** way to learn common ASL words:

- Each flashcard displays a high-quality image of an ASL sign and the associated word.
- When hovered, the word is spoken aloud using TTS.
- Users can flip through cards manually.

---

### 3. Practice Mode

This mode enables **hands-on learning** by using the webcam for real-time gesture classification. Users can:

- Perform an ASL gesture
- Capture it with a single button
- Get feedback on recognition success

Textual results are displayed in a large textbox, and if a gesture is successfully recognized, it is:
- Shown in the textbox
- Read aloud via TTS
- Visually confirmed with a green checkmark

Incorrect gestures show a red X, prompting the user to try again.

---

### Accessibility Highlights

- All interactive elements in **Practice Mode** use **Text-to-Speech** on hover to assist blind and visually impaired users.
- Buttons are **extra large** and use **vivid contrast colors** for visibility.
- Tab layout and animations ensure an intuitive experience.

