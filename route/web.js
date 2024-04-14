const express = require("express")
const homeController = require("../controllers/homeController.js");
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.post('/predict', homeController.predictPage)
    return app.use('/', router)
}

module.exports = initWebRoutes