const { User, Address } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.register = async (req, res) => {
  const {name, email, password, phoneNumber} = req.body;
  try {
    const existingUser = await User.findOne({where: {email}});
    if (existingUser)
      return res.status(400).json({message: "Email already registered"});

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      isEmailVerified: false,
    });

    const token = generateToken({id: user.id, role: "buyer"});
    await sendVerificationEmail(email, token, false);

    res
      .status(201)
      .json({message: "Registered successfully. Verify your email."});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({message: "Registration failed", error: err.message});
  }
};

exports.verifyEmail = async (req, res) => {
  const {token} = req.query;
  try {
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({message: "User not found"});

    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({message: "Email verified successfully"});
  } catch (err) {
    res.status(400).json({message: "Invalid or expired token"});
  }
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({where: {email}});
    if (!user) return res.status(400).json({message: "Register before Login"});
    if (!user.isEmailVerified)
      return res.status(403).json({message: "Verify your email first"});

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({message: "Invalid credentials"});

    const token = generateToken({id: user.id, role: "buyer"});
    res
      .status(200)
      .json({token, user: user.name, email: user.email, id: user.id,role:"buyer"});
  } catch (err) {
    res.status(500).json({message: "Login failed"});
  }
};

exports.getUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id, {attributes: {exclude: ["password"]}});
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({message: "Unauthorized"});
  }
};

// Google OAuth (simplified for client-provided ID token)
exports.googleLogin = async (req, res) => {
  const {email, name} = req.body;
  try {
    let user = await User.findOne({where: {email}});
    if (!user) {
      user = await User.create({
        email,
        password: "GOOGLE_AUTH",
        phoneNumber: null,
        isEmailVerified: true,
      });
    }

    const token = generateToken({id: user.id});
    res.status(200).json({token});
  } catch (err) {
    res.status(500).json({message: "Google login failed"});
  }
};
