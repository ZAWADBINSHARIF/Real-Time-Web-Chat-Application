// internal import
const bcrypt = require('bcrypt')
const { unlink } = require('fs')
const path = require('path')

// external import
const User = require('../models/listOfUsers')

// get users page
async function getUsers(req, res, next) {
    try {
        const allUsers = await User.find()
        res.render('users', {
            users: allUsers
        })
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

    try {
        await newUser.save();
        return res.status(200).json({
            message: "User was added successfully"
        })
    } catch (err) {
        if (err) {
            return res.status(500).json({
                errors: {
                    common: { msg: err.message }
                }
            })
        }
    }
}

async function deleteUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id
        })

        if (user.avatar) {
            unlink(path.join(__dirname + "/../public/uploads/avatars/" + user.avatar),
                err => { if (err) console.log(err) }
            )
        }

        res.status(200).json({
            message: 'User was removed successfully'
        })

    } catch (error) {
        if (error) {
            throw res.status(500).json({
                errors: {
                    common: {
                        msg: error.message
                    }
                }
            })
        }
    }
}

module.exports = {
    getUsers,
    addNewUser,
    deleteUser
}