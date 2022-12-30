// external import
const express = require('express')

// internal import
const { getUsers, addNewUser, deleteUser } = require('../controllers/usersController')
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const avatarUploader = require('../middlewares/users/avatarUploader')
const { addUserValidation, userValidationHandler } = require('../middlewares/users/userValidation')

const router = express.Router()

router.route('/')
    .get(decorateHtmlResponse("Users"), getUsers)
    .post(
        avatarUploader,
        addUserValidation,
        userValidationHandler,
        addNewUser)

router.delete('/:id', deleteUser)

module.exports = router