const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cron = require('node-cron');
const axios = require("axios");


//Load Models
const WeatherData = require("./models/WeatherData");
const BikesData = require("./models/BikesData");


// Creating an express app
const app = express();

const connectDB = require("./config/db");

// Initializing dotenv || Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Import Route files
const fetchData = require('./routes/fetchDataRoutes')

// using JSON parser
app.use(express.json({ limit: "70mb" }));

// Enable cors
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use('/api/v1', fetchData)

// app.get('/', (req, res) => {
//     res.json({
//         message: "DIGIKRAFT"
//     })
// })

if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.json({
      message: "DIGIKRAFT",
    });
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "DIGIKRAFT",
    });
  });
}

// CRON JOBS SCHEDULE API CALLS AND DB INSERT

cron.schedule('* */1 * * *', async () => {
    try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=75.1652&lon=39.9526&APPID=${process.env.APPID}`
        );
        if (response) {
          const createRecord = await WeatherData.create({
            weather: response.data.weather,
            base: response.data.base,
            main: response.data.main,
            visibility: response.data.visibility,
            wind: response.data.wind,
            clouds: response.data.clouds,
            dt: response.data.dt,
            sys: response.data.sys,
            timezone: response.data.timezone,
            cod: response.data.cod,
          });
    
          console.log("Created");
        } else {
          console.log("No record found!");
        }
    
      } catch (error) {
        console.error(error);
      }

});

cron.schedule('* */1 * * *', async () => {
    try {
        const bikesResponse = await axios.get(
          "https://kiosks.bicycletransit.workers.dev/phl"
        );
        if(bikesResponse) {
            const newData = bikesResponse.data.features[0]
            const record = await BikesData.create({
                properties: newData.properties,
              });
            console.log('Created')
        } else {
            console.log("No Data Found")
        }
        // console.log(bikesResponse);
      } catch (error) {
        console.error(error);
      }

});

// Use error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// app listener
app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
