
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
    try {
        let { username, email, password, phone } = req.body;

        // 1. Validate required fields
        if (!username || !email || !password || !phone) {
            return res.status(400).json({
                message: "Username, email, password and phone are required"
            });
        }

        // 2. Normalize user input
        username = username.trim();
        email = email.trim().toLowerCase();
        phone = phone.trim();

        if (!username || !email || !password || !phone) {
            return res.status(400).json({
                message: "Fields cannot contain only whitespace"
            });
        }

        // 3. Check whether the email already exists
        const alreadyExists = await User.findOne({ email });

        if (alreadyExists) {
            return res.status(409).json({
                message: "User already exists with this email"
            });
        }

        // 4. Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // 5. Create and save the user
        const newUser = new User({
            username,
            email,
            passwordHash,
            phone
        });

        const user = await newUser.save();

        // 6. Return only safe user information
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Failed to register user:", error.message);

        // Handle MongoDB duplicate-key errors
        if (error.code === 11000) {
            return res.status(409).json({
                message: "User already exists with this email"
            });
        }

        // Handle Mongoose schema validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid user data",
                errors: Object.values(error.errors).map(
                    err => err.message
                )
            });
        };

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports.loginUser = async(req, res)=> {
    try {

    
    let {email, password} = req.body;

    if( !email || !password) {
        return res.status(400).json({
            message : "Email and Password are required fields"
        });
    }

    if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                message: "Email and password must be strings"
            });
        }


    email = email.trim().toLowerCase();
    if(email === "") {
        return res.status(400).json({
            message : "Email cannot be empty"
        });
    }
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    let user = await User.findOne({email});
    if(!user) {
        return res.status(401).json({
            message : "Invalid Email or Password"
        });
    };
    let validatePassword = await bcrypt.compare(password, user.passwordHash);
    if(!validatePassword) {
        return res.status(401).json({
            message : "Invalid Email or Password"
        });
    };

    const payload = {
        id : user._id,
        email : user.email,
        role : user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "7d"});
    return res.status(200).json({
        success : true,
        token : token
    });
    } catch (error) {
        console.error("LogIn failed", error.message);
        return res.status(500).json({
            message : "Internal Server Error"
        });
    };
}   