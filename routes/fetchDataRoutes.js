const express = require('express')
const { getExactTime, getAllData, getTimeRange } = require('../controllers/fetchDataController')



const router = express.Router()

router.route('/alldata')
    .get(getAllData)

router.route('/exacttime/:exactdatetime')
    .get(getExactTime)

router.route('/timerange/:fromdatetime/:todatetime')
    .get(getTimeRange)

module.exports = router