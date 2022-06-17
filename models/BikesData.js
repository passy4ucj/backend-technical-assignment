const mongoose = require("mongoose");

const propertiesSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  totalDocks: {
    type: Number,
  },
  dockesAvailable: {
    type: String,
  },
  bikesAvailable: {
    type: Number,
  },
  classicBikesAvailable: {
    type: Number,
  },
  smartBikesAvailable: {
    type: Number,
  },
  electricBikesAvailable: {
    type: Number,
  },
  rewardBikesAvailable: {
    type: Number,
  },
  rewardDocksAvailable: {
    type: Number,
  },
  kioskPublicStatus: {
    type: String,
  },
  kioskConnectionStatus: {
    type: String,
  },
  kioskType: {
    type: Number,
  },
  addressStreet: {
    type: String,
  },
  addressState: {
    type: String,
  },
  addressZipCode: {
    type: String,
  },
  bikes: [
    {
      dockerNumber: { type: Number },
      isElectric: { type: Boolean },
      isAvailable: { type: Boolean },
      battery: { type: String },
    },
  ],

  isEventBased: { type: Boolean },
  isVirtual: { type: Boolean },
  kioskId: { type: Number },
  trikesAvailable: { type: Number },
  latitude: { type: Number },
  longitude: { type: Number },
});

const bikesDataSchema = new mongoose.Schema({
  properties: propertiesSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BikesData = mongoose.model("BikesData", bikesDataSchema);

module.exports = BikesData;
