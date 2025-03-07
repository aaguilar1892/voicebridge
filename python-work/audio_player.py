"""
audio_player.py

This module provides a TextToSpeechEngine class that converts text into spoken audio
using the Google Text-to-Speech (gTTS) library and plays the audio using pygame.
It is intended to be modular so that it can be imported into your main ASL recognition program
to audibly output recognized signs for visually impaired users.

Dependencies:
    - gTTS: Install via `pip install gTTS`
    - pygame: Install via `pip install pygame`

Note:
    - An active internet connection is required for gTTS as it leverages Google's TTS API.
    - The default voice provided by gTTS is used (voice selection is not available).
    - This module uses pygame for audio playback, as playsound is not available.
"""

import os
import tempfile
import threading
import time
from gtts import gTTS
import pygame

class TextToSpeechEngine:
    """
    A class to convert text to speech using Google Text-to-Speech (gTTS) and play it using pygame.

    Attributes:
        lang (str): The language code for speech synthesis (default is 'en' for English).
        slow (bool): Flag indicating if speech should be slower than normal (default is False).
    """
    def __init__(self, lang: str = 'en', slow: bool = False):
        """
        Initializes the TextToSpeechEngine with the specified language and speed settings.
        Also initializes the pygame mixer for audio playback.

        Args:
            lang (str): Language code for TTS (e.g., 'en' for English). Defaults to 'en'.
            slow (bool): Whether the speech should be spoken slowly. Defaults to False.
        """
        self.lang = lang
        self.slow = slow
        # Initialize pygame mixer for audio playback.
        pygame.mixer.init()

    def speak(self, text: str) -> None:
        """
        Converts the provided text into speech and plays it synchronously.

        This method uses gTTS to synthesize speech from the text. The audio is saved as a temporary MP3 file,
        which is then played using pygame. After playback, the temporary file is deleted.

        Args:
            text (str): The text to convert to speech.
        """
        if not text:
            return

        try:
            # Generate speech audio using gTTS.
            tts = gTTS(text=text, lang=self.lang, slow=self.slow)
            # Create a temporary file to store the audio.
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as fp:
                temp_path = fp.name
            # Save synthesized audio to temporary file.
            tts.save(temp_path)

            # Load and play the audio using pygame.
            pygame.mixer.music.load(temp_path)
            pygame.mixer.music.play()

            # Wait for the audio playback to finish.
            while pygame.mixer.music.get_busy():
                time.sleep(0.1)
        except Exception as e:
            print(f"An error occurred during TTS processing: {e}")
        finally:
            # Clean up the temporary file.
            if os.path.exists(temp_path):
                os.remove(temp_path)

    def speak_async(self, text: str) -> None:
        """
        Converts the provided text into speech and plays it asynchronously.

        This method spawns a new thread to run the speak() method, allowing real-time applications
        (such as live video feed processing) to continue without blocking the main loop.

        Args:
            text (str): The text to convert to speech.
        """
        threading.Thread(target=self.speak, args=(text,)).start()

# Example usage:
# if __name__ == "__main__":
#     tts_engine = TextToSpeechEngine()
#     tts_engine.speak("Hello, this is a test of the audio system.")
