// The path to your python script
var myPythonScript = "../ml_model_api/script.py";
// Provide the path of the python executable, if python is available as environment variable then you can use only "python"
var pythonExecutable = "python";

// Function to convert an Uint8Array to a string
var uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};

const spawn = require('child_process').spawn;
const scriptExecution = spawn(pythonExecutable, [myPythonScript]);




// Handle error output
// scriptExecution.stderr.on('data', (data) => {
//     // As said before, convert the Uint8Array to a readable string.
//     console.log(uint8arrayToString(data));
// });

let predict = async (features) => {
    var data = JSON.stringify(features);
    scriptExecution.stdin.write(data);
    // End data write
    scriptExecution.stdin.end();
    console.log('predicting')
    let result = 0;
    // Handle normal output
    await scriptExecution.stdout.on('data', (data) => {
        result = uint8arrayToString(data);
        console.log(result)
    });
    return result;
}
module.exports = predict
