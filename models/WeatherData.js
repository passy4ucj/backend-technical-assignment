const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  main: {
    type: String,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const sysSchema = new mongoose.Schema({
  sunrise: {
    type: Number,
  },
  sunset: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cloudSchema = new mongoose.Schema({
  all: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const windSchema = new mongoose.Schema({
  speed: {
    type: Number,
  },
  deg: {
    type: Number,
  },
  gust: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const mainSchema = new mongoose.Schema({
  temp: {
    type: Number,
  },
  feels_like: {
    type: Number,
  },
  temp_min: {
    type: Number,
  },
  temp_max: {
    type: Number,
  },
  pressure: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
  sea_level: {
    type: Number,
  },
  grnd_level: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const dataSchema = new mongoose.Schema({
  weather: [weatherSchema],
  base: {
    type: String,
  },
  main: mainSchema,
  visibility: {
    type: Number,
  },
  wind: windSchema,
  clouds: cloudSchema,
  dt: {
    type: Number,
  },
  sys: sysSchema,
  timezone: {
    type: Number,
  },
  id: {
    type: Number,
  },
  cod: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WeatherData = mongoose.model("WeatherData", dataSchema);

module.exports = WeatherData;
