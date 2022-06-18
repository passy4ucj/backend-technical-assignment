const WeatherData = require("../models/WeatherData");
const BikesData = require("../models/BikesData");
const asyncHandler = require('express-async-handler')

const getExactTime = asyncHandler(async (req, res) => {
   
    // const customer = await AccessCardCustomer.findOne({ creditAccountNumber: req.params.creditAccountNumber }).populate('responses')
    const getWeatherExactDateTime = await WeatherData.find({
        createdAt: {
          $gte: `${req.params.exactdatetime}`,
          $lte: `${req.params.exactdatetime}`,
        }
      })
      // $gte: `2022-06-16T00:00:00.000+00:00`,
      // $lte: `2022-06-16T23:59:59.000+00:00`,
      const getBikesExactDateTime = await BikesData.find({
        createdAt: {
          $gte: `${req.params.exactdatetime}`,
          $lte: `${req.params.exactdatetime}`,
        }
      })

      if(!getWeatherExactDateTime || !getBikesExactDateTime) {
        res.json({
          success: true,
          message: 'No Record found'
        })
      }

    res.json({
        success: true,
        getWeatherExactDateTime,
        getBikesExactDateTime,
    })
})

const getTimeRange = asyncHandler(async (req, res) => {
   
  // const customer = await AccessCardCustomer.findOne({ creditAccountNumber: req.params.creditAccountNumber }).populate('responses')
  const getWeatherDateTime = await WeatherData.find({
      createdAt: {
        $gte: `${req.params.fromdatetime}`,
        $lte: `${req.params.todatetime}`,
      }
    })
    // $gte: `2022-06-16T00:00:00.000+00:00`,
    // $lte: `2022-06-16T23:59:59.000+00:00`,
    const getBikesDateTime = await BikesData.find({
      createdAt: {
        $gte: `${req.params.fromdatetime}`,
        $lte: `${req.params.todatetime}`,
      }
    })

    if(!getWeatherDateTime || !getBikesDateTime) {
      res.json({
        success: true,
        message: 'No Record found'
      })
    }

  res.json({
      success: true,
      getWeatherDateTime,
      getBikesDateTime,
  })
})


module.exports = {
    getExactTime,
    getTimeRange,
}