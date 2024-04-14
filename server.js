const express = require("express")
const configViewEngine = require("./config/viewEngine")
const initWebRoutes = require("./route/web")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

configViewEngine(app)
initWebRoutes(app)

app.listen(2000, () => {
    console.log('Listening on port 2000')
})