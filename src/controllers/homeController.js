// The path to your python script
var myPythonScript = "src/ml_model_api/script.py";
// Provide the path of the python executable, if python is available as environment variable then you can use only "python"
var pythonExecutable = "python";

// Function to convert an Uint8Array to a string
var uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};

const spawn = require('child_process').spawn;


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
            reject(e);
        }
    });
}

let getHomePage = (req, res) => {
    return res.render("index.ejs", {
        data: {
            km_driven: '',
            door: '',
            seat: '',
            fuel_consumption: '',
            used: '',
            imported: '',
        },
        price: 0
    })
}

let predictPage = async (req, res) => {
    let data = req.body
    let features = Object.values(data)
    let predictedPrice = await predict(features)
    console.log("predicted price in home controlller: ", predictedPrice)
    return res.render("index.ejs", {data: data, price: predictedPrice})
}
module.exports = {
    getHomePage: getHomePage,
    predictPage: predictPage
}