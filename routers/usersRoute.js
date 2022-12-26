// external import
const express = require('express')

// internal import
const { getUsers } = require('../controllers/usersController')
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const avatarUploader = require('../middlewares/users/avatarUploader')
const { addUserValidation } = require('../middlewares/users/userValidation')

const router = express.Router()

router.route('/')
    .get(decorateHtmlResponse("Users"), getUsers)
    .post(avatarUploader, addUserValidation)

module.exports = router