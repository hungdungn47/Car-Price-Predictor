import predict from "./src/services/service";

async function getFeatures() {
    var kms_driven = document.getElementById('km_driven').value;
    var doors = document.getElementById('door').value;
    var seats = document.getElementById('seat').value;
    var fuel_consumption = document.getElementById('fuel_consumption').value;
    var used = document.getElementById('used').value;
    var imported = document.getElementById('imported').value;

    // var apiUrl = `http://127.0.0.1:8000/predict?Kms_Driven=${kms_driven}&Doors=${doors}&Seats=${seats}
    // &Fuel_Consumption=${fuel_consumption}&Imported=${imported}&Used=${used}`;

    var carPrice = await predict([kms_driven, doors, seats, fuel_consumption, used, imported]);
    // await fetch(apiUrl)
    //     .then(response => {
    //         // Check if response is successful (status code 200)
    //         if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //         }
    //         // Parse JSON response
    //         return response.json();
    //     })
    //     .then(data => {
    //         // Display data on the web page
    //         carPrice = data[0];
    //         console.log(carPrice)
    //     })
    //     .catch(error => {
    //         // Handle errors
    //         console.error('Error fetching data:', error);
    //     });
    
    document.getElementById('response').textContent = 'Your car might cost ' + carPrice;
}