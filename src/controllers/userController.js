const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({email:email});
    if(existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword,
    });

    const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET); 
    res.status(201).json({user: result, token: token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            status: "success",
            message: "User signed in successfully",
            token: token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "false",
            message: "Internal server error"
        });
    }
};


module.exports = { signin, signup };
