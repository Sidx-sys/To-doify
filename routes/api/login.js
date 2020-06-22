const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// Item Model
const User = require("../../models/User");

// @route api/login/
// @desc Login an exisiting user
// @access Public
router.post("/", (req, res) => {
    const { email, password } = req.body;
    errors = {};
    isErrors = false;

    if (!email) {
        errors["email"] = "Please enter the email field";
        isErrors = true;
    }

    if (!password) {
        errors["password"] = "Please enter the password field";
        isErrors = true;
    }

    if (isErrors) {
        return res.status(400).json(errors);
    }

    User.findOne({ email }).then((user) => {
        if (!user) {
            errors["email"] = "User does not exist";
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res
                    .status(400)
                    .json({ password: "Invalid Email or Password", email: "" });

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

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then((user) => res.json(user));
});

module.exports = router;
