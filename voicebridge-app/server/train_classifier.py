#Run this second!

import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np
import os

TWO_HAND_MODE = True
EXPECTED_FEATURES = 85 if TWO_HAND_MODE else 42

def pad_or_truncate(sample, expected_length=EXPECTED_FEATURES):
    """
    Ensures that each sample has exactly expected_length features.
    If the sample is too short (e.g., one-hand data in two-hand mode), pad with zeros.
    If the sample is too long, truncate it.
    """
    if len(sample) < expected_length:
        sample = sample + [0.0] * (expected_length - len(sample))
    elif len(sample) > expected_length:
        sample = sample[:expected_length]
    return sample

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
PICKLE_PATH = os.path.join(SCRIPT_DIR, 'data.pickle')


data_dict = pickle.load(open(PICKLE_PATH, 'rb'))
data = data_dict['data']      
labels = np.asarray(data_dict['labels'])


data_uniform = [pad_or_truncate(sample) for sample in data]
data_uniform = np.array(data_uniform)

# Split the data into training and testing sets.
x_train, x_test, y_train, y_test = train_test_split(
    data_uniform, labels, test_size=0.2, shuffle=True, stratify=labels
)


model = RandomForestClassifier()
model.fit(x_train, y_train)


y_predict = model.predict(x_test)
score = accuracy_score(y_predict, y_test)
print('{}% of samples were classified correctly!'.format(score * 100))

# Save the trained model.
with open('model.p', 'wb') as f:
    pickle.dump({'model': model}, f)
