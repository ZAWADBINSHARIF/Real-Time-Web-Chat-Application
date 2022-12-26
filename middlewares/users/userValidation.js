// external import
const { check } = require('express-validator')
const createHttpError = require('http-errors')

// internal import
const User = require('../../models/listOfUsers')

const addUserValidation = [
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: "-" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async value => {
            try {
                const foundUser = await User.findOne({ email: value })
                if (foundUser) {
                    throw createHttpError("Email already is used ")
                }
            } catch (error) {
                createHttpError(error.message)
            }
        }),
    check('mobile')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage("Mobile number is required")
        .custom(async value => {
            try {
                const foundUser = await User.findOne({ mobile: value })
                if (foundUser) {
                    throw createHttpError("Mobile number already is used ")
                }
            } catch (error) {
                createHttpError(error.message)
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol')
]

module.exports = {
    addUserValidation
}