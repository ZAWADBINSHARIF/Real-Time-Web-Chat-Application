// external import
const { check, validationResult } = require('express-validator')
const createHttpError = require('http-errors')
const { unlink } = require('fs')

// internal import
const User = require('../../models/listOfUsers')
const path = require('path')

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
                throw createHttpError(error.message)
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
                throw createHttpError(error.message)
            }
        }),
    check('password')
        .isLength({min:1})
        .withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol')
]

const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()

    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        if (req.files.length > 0) {
            const fileName = req.files[0]
            unlink(path.join(__dirname, `../../public/uploads/avatars/${fileName}`)),
                err => { if (err) throw console.log(err) }
        }
    }

    res.status(500).json({
        errors: mappedErrors
    })
}

module.exports = {
    addUserValidation,
    userValidationHandler
}