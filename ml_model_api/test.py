import pickle
import sys, json

model = pickle.load(open('decision_tree_model.pkl', 'rb'))
makeprediction = model.predict([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
output = round(makeprediction[0], 2)
print('test: ', output)