const WeatherData = require("../models/WeatherData");
const BikesData = require("../models/BikesData");
const asyncHandler = require('express-async-handler')

const getExactTime = asyncHandler(async (req, res) => {
    // const customer = await AccessCardCustomer.findOne({ creditAccountNumber: req.params.creditAccountNumber }).populate('responses')
    const getWeatherExactDateTime = await WeatherData.find({
        createdAt: {
          $gte: `2022-06-16T00:00:00.000+00:00`,
          $lte: `2022-06-16T23:59:59.000+00:00`,
        }
      })

      const getBikesExactDateTime = await BikesData.find({
        createdAt: {
          $gte: `2022-06-16T00:00:00.000+00:00`,
          $lte: `2022-06-16T23:59:59.000+00:00`,
        }
      })
    // if(customer) {
    //     res.json({
    //         success: true,
    //         customer
    //     })
    // } else {
    //     res.status(400)
    //     throw new Error('Customer not found')
    // }
    res.json({
        success: true,
        getWeatherExactDateTime,
        getBikesExactDateTime,
    })
})




module.exports = {
    getExactTime,
}