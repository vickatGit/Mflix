const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/db_connection')
const movieRoutes = require('./routes/movieRoutes')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const limiter = require('express-rate-limit')
const app = express()
limiter = limiter.rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,
    message:"Too Many Requests, Please Try Again Later"
})
const options = {
    definition : {
        openapi:"3.0.0",
        info:{
            title:"Mflix Api Documentation",
            version:"1.0.0",
            desciption:"Documentaion for Api which is Based on MongoDB Sample MFlix Database"
        },
        servers :[ {
            url:"http://localhost:8080"
        }],
    },
    apis : ["./routes/*.js"]
}
dotenv.config()
dbConnect()
app.use(limiter)
app.use(express.json())
app.use('/mflix/',movieRoutes)

const apiSpecs = swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(apiSpecs))

app.listen(process.env.PORT,() => {
    console.log(`listening on ${process.env.PORT}`)
})
