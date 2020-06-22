const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Item Model
const User = require("../../models/User");

// @route api/register/
// @desc Create a new user
// @access Public
router.post("/", (req, res) => {
    const { name, email, password, password2 } = req.body;
    errors = {};
    isErrors = false;

    if (!name) {
        errors["name"] = "Please enter the name field";
        isErrors = true;
    }

    if (!email) {
        errors["email"] = "Please enter the email field";
        isErrors = true;
    }

    if (!password) {
        errors["password"] = "Please enter the password field";
        isErrors = true;
    } else if (!password2) {
        errors["password2"] = "Please confirm your password";
        isErrors = true;
    } else if (password !== password2) {
        errors["passwordDiff"] = "Passwords are not same";
        isErrors = true;
    }

    if (isErrors) {
        return res.status(400).json(errors);
    }

    User.findOne({ email }).then((user) => {
        if (user) {
            errors["email"] = "User already exists";
            return res.status(400).json(errors);
        }
        const newUser = new User({
            name,
            email,
            password,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
                    jwt.sign(
                        { id: user._id },
                        config.get("jwtSecret"),
                        {
                            expiresIn: 7600,
                        },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                },
                            });
                        }
                    );
                });
            });
        });
    });
});

module.exports = router;
