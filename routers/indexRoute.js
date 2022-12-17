// external import
const express = require('express')

// internal import
const { getIndex } = require('../controllers/indexController')
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')

const router = express.Router()

router.get("/", decorateHtmlResponse("Index"), getIndex)

module.exports = router