import joblib
import numpy as np

class SVM:
    def __init__(self, model_path, mode='alphabet'):
        self.model = joblib.load(model_path)
        self.landmarks = np.empty([63], dtype=np.float64)

        if (mode.lower() == 'alphabet'):
            self.label_dict = ['A','B','C','D','del','E','F','G','H','I','J','K','L','M','N','nothing','O','P','Q','R','S','space','T','U','V','W','X','Y','Z']
        else:
            raise(NotImplementedError('Only alphabet mode is currently implemented'))

    def predict(self, right_hand_landmarks): # todo add option for both hands 

        if (right_hand_landmarks != None):
            for i, landmark in enumerate(right_hand_landmarks.landmark):

                # append in x0,y0,z0, x1, ... 
                self.landmarks[3*i] = landmark.x
                self.landmarks[3*i + 1] = landmark.y
                self.landmarks[3*i + 2] = landmark.z

            return self.label_dict[self.model.predict(self.landmarks.reshape(1, -1))[0]]

        else:
            return 'nothing'


        