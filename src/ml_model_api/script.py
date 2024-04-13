import pickle
import sys, json

def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def predict(data):
    # Kms_Driven: str, Doors: str, Seats: str, Fuel_Consumption: str, Imported: str, Used: str
    model = pickle.load(open('src/ml_model_api/decision_tree_model.pkl', 'rb'))
    makeprediction = model.predict([data])
    output = round(makeprediction[0], 2)
    return output

def main():
    #get our data as an array from read_in()
    data = read_in()
    print(predict(data))

# Start process
if __name__ == '__main__':
    main()