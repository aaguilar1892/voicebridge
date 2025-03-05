import pyttsx3
import threading
from queue import Queue

class ASLTranscriber:
    def __init__(self, rate=150, volume=1.0):
        # Create a queue for text-to-speech jobs.
        self.tts_queue = Queue()
        # Initialize the TTS engine and adjust its properties.
        self.engine = pyttsx3.init()
        self.engine.setProperty('rate', rate)
        self.engine.setProperty('volume', volume)
        # Start the worker thread that processes the queue.
        self.thread = threading.Thread(target=self._tts_worker, daemon=True)
        self.thread.start()

    def _tts_worker(self):
        while True:
            text = self.tts_queue.get()
            if text and text.lower() != 'nothing':  # Filter out non-meaningful predictions.
                self.engine.say(text)
                self.engine.runAndWait()
            self.tts_queue.task_done()

    def speak(self, text):
        """Queue a text string for audio output."""
        self.tts_queue.put(text)
