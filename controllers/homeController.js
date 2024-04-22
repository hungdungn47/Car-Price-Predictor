// The path to your python script
var myPythonScript = "ml_model_api/script.py";
// Provide the path of the python executable, if python is available as environment variable then you can use only "python"
var pythonExecutable = "python";

// Function to convert an Uint8Array to a string
var uint8arrayToString = (data) => {
    return String.fromCharCode.apply(null, data);
};

const spawn = require('child_process').spawn;
const carBrands = ['Mercedes','Audi','Bentley','Daewoo','Chevrolet','BMW','Jaguar','LandRover',
                'Lexus','Maserati','Mercedes Benz','Nissan','Peugeot','Porsche','Volkswagen',
                'Volvo']

const encodedBrand = {'LandRover': 6, 'Peugeot': 11, 'Mercedes': 8, 'Porsche': 12, 'Audi': 0, 
                    'Mercedes Benz': 9, 'Chevrolet': 3, 'BMW': 1, 'Lexus': 7, 'Nissan': 10, 
                    'Jaguar': 5, 'Bentley': 2, 'Daewoo': 4}

let predict = async (features) => {
    return new Promise((resolve, reject) => {
        try {
            const scriptExecution = spawn(pythonExecutable, [myPythonScript]);
            var data = JSON.stringify(features);
            scriptExecution.stdin.write(data);
            // End data write
            scriptExecution.stdin.end();
        
            console.log('predicting')
            let result = 0;
            // Handle normal output
            scriptExecution.stdout.on('data', async (data) => {
                result = uint8arrayToString(data);
                console.log("python result: ", result);
                resolve(result);
            });
        } catch (e) {
            console.log("error")
            reject(e);
        }
    });
}

let getHomePage = (req, res) => {
    return res.render("index.ejs", {
        brandsData: carBrands,
        data: {
            brand: '',
            driven: '',
            fuel_type: '',
            km_driven: 0,
            door: 0,
            seat: 0,
            fuel_consumption: 0,
            used: 0,
            imported: 0,
        },
        price: 0
    })
}

let predictPage = async (req, res) => {
    // let data = req.body
    // console.log('data from predictPage: ', data)


    let data = req.body
    console.log('test data: ', data)
    
    let dummyData = {
        brand: encodedBrand[data.brand],
        km_driven: data.km_driven,
        door: data.door,
        seat: data.seat,
        fuel_consumption: data.fuel_consumption,
        imported: data.imported,
        used: data.used,
        fuel_type_electric: 0,
        fuel_type_hybrid: 0,
        fuel_type_gas: 0,
        driven_rwd: 0,
        driven_fwd: 0,
        driven_awd: 0,
        
    }
    let drivenFeature = 'driven_' + data.driven
    dummyData[drivenFeature] = 1;

    let fuelTypeFeature = 'fuel_type_' + data.fuel_type
    dummyData[fuelTypeFeature] = 1;
    console.log('Dummy data: ', dummyData)

    let features = Object.values(dummyData)
    let predictedPrice = await predict(features)
    console.log("predicted price in home controlller: ", predictedPrice)
    return res.render("index.ejs", {brandsData: carBrands,data: data, price: predictedPrice})
}
module.exports = {
    getHomePage: getHomePage,
    predictPage: predictPage
}