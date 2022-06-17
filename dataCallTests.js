const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const axios = require("axios");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Load Models
const WeatherData = require("./models/WeatherData");
const BikesData = require("./models/BikesData");
//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Weather API CALL
const getWeatherData = async () => {
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
};

const getBikesData = async () => {
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
};


// getWeatherData();
getBikesData()