#Run this second!

import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np


data_dict = pickle.load(open('./data.pickle', 'rb'))
data = data_dict['data']      # this is a list of lists (ragged)
labels = np.asarray(data_dict['labels'])


EXPECTED_FEATURES = 42

def pad_or_truncate(sample, expected_length=EXPECTED_FEATURES):
    
    if len(sample) < expected_length:
        
        sample = sample + [0.0] * (expected_length - len(sample))
    elif len(sample) > expected_length:
        
        sample = sample[:expected_length]
    return sample


data_uniform = [pad_or_truncate(sample) for sample in data]
data_uniform = np.array(data_uniform)

x_train, x_test, y_train, y_test = train_test_split(
    data_uniform, labels, test_size=0.2, shuffle=True, stratify=labels
)


model = RandomForestClassifier()
model.fit(x_train, y_train)


y_predict = model.predict(x_test)
score = accuracy_score(y_predict, y_test)
print('{}% of samples were classified correctly!'.format(score * 100))


with open('model.p', 'wb') as f:
    pickle.dump({'model': model}, f)
