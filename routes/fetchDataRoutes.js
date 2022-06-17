const express = require('express')
const { getExactTime } = require('../controllers/fetchDataController')



const router = express.Router()

router.route('/exacttime/:exactdatetime')
    .get(getExactTime)

module.exports = router