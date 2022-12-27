// internal import
const bcrypt = require('bcrypt')

// external import
const User = require('../models/listOfUsers')

// get users page
function getUsers(req, res, next) {
    try {
        res.render('users')
    } catch (error) {
        next(error)
    }
}

// add user
async function addNewUser(req, res, next) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
    }

    // save user or send error

    const result = await newUser.save();

    // try {
    //     const result = await newUser.save()
    //     res.status(200).json(
    //         {
    //             message: "User was added successfully!"
    //         }
    //     )
    // } catch (error) {
    //     res.status(500).json(
    //         {
    //             errors: {
    //                 common: {
    //                     msg: error.message
    //                 }
    //             }
    //         }
    //     )
    // }
}

module.exports = {
    getUsers,
    addNewUser
}