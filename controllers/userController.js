const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, contact, about } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        email,
        password,
        contact,
        about,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            city: user.city,
            country: user.country,
            email: user.email,
            contact: user.contact,
            about: user.about,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    let passwordMatch;
    if (user) {
        passwordMatch = await user.comparePassword(password);
    }

    if (!passwordMatch) {
        res.status(401).json("Incorrect Password");
    }

    if (user && passwordMatch) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            city: user.city,
            country: user.country,
            email: user.email,
            contact: user.contact,
            about: user.about,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

const editUser = asyncHandler(async (req, res) => {
    const { userId, name, city, country, contact, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            name,
            city,
            country,
            contact,
            about,
        },
        { new: true }
    );

    if (!updatedUser) {
        res.status(400);
        throw new Error("User not found");
    } else {
        res.status(200).send(updatedUser);
    }
});

module.exports = {
    registerUser,
    authUser,
    editUser,
};
