const User = require("../dataa/models/user") // Ensure the correct path to your user model
const bcrypt = require("bcryptjs");

// Register a user
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: null, // Placeholder for token generation
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Get user details
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Assuming req.user is populated from a middleware

        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
};
