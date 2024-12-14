const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');

// Signup function
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ 
                message: 'User already exists, you can log in', 
                success: false 
            });
        }

        // Create new user
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error("Error during signup:", err); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Authentication failed, email or password is wrong';

        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Compare passwords
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Ensure JWT secret is defined
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in .env file.");
            return res.status(500).json({ message: "Internal server error: JWT secret missing", success: false });
        }

        // Generate JWT token
        let jwtToken;
        try {
            jwtToken = jwt.sign(
                { email: user.email, _id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
        } catch (err) {
            console.error("Error during JWT token generation:", err); // Log JWT errors
            return res.status(500).json({ message: "Internal server error: JWT generation failed", success: false });
        }

        // Return success response
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        console.error("Error during login:", err); // Log any other errors
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login
};
