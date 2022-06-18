var assert = require('assert');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const axios = require("axios");

//Load env vars
dotenv.config({ path: "../config/config.env" });

//Load Models
const WeatherData = require("../models/WeatherData");
const BikesData = require("../models/BikesData");
//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});


describe('Array', function () {
    describe('#indexOf()', function () {
      it('should return -1 when the value is not present', async function () {

    const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=75.1652&lon=39.9526&APPID=${process.env.APPID}`
      );
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });