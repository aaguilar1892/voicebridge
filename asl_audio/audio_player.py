import pyttsx3

class AudioPlayer:
    def __init__(self):
        self.engine = pyttsx3.init()

    def speak(self, text):
        """Convert the provided text to speech."""
        self.engine.say(text)
        self.engine.runAndWait()
