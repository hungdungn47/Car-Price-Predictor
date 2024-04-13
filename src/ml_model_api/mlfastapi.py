from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pickle

app = FastAPI(debug=True)
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def home():
    return {'text': 'Car pricing prediction'}

@app.get('/predict')
def predict(Kms_Driven: str, Doors: str, Seats: str, Fuel_Consumption: str, Imported: str, Used: str):
    model = pickle.load(open('decision_tree_model.pkl', 'rb'))
    makeprediction = model.predict([[Kms_Driven, Doors, Seats, Fuel_Consumption, Imported, Used]])
    output = round(makeprediction[0], 2)
    return {output}
if __name__ == '__main__':
    uvicorn.run(app)