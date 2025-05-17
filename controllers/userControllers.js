const client = require("../database/pgres.js");
/*
  user_id          SERIAL          PRIMARY KEY,
  name             VARCHAR(50)     NOT NULL,
  email            VARCHAR(50)     NOT NULL       UNIQUE,
  google_id        VARCHAR(35)     NOT NULL       UNIQUE,
  picture          VARCHAR(255),
  address          VARCHAR(255)
*/
/*
  address_id       SERIAL          PRIMARY KEY,
  user_id          INT REFERENCES USERS_TABLE(user_id),
  street_address   VARCHAR(255),
  city             VARCHAR(100),
  state            VARCHAR(100),
  postal_code      VARCHAR(20)
*/

const { User, Address } = require('../models');

const allUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
};

const specificUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Fill The Credentials" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User Doesn't Exist" });

    if (user.google_auth) {
      return res.status(400).json({ message: "User Previously Authenticated With Google" });
    }

    const matchedUser = await User.findOne({ where: { email, password } });
    if (!matchedUser) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    res.status(200).json(matchedUser);
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, picture } = req.body;
    if (!email) return res.status(400).json({ message: "Email is essential" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      if (existingUser.google_auth) return res.status(200).json(existingUser);
      return res.status(400).json({ message: "Email Already Used" });
    }

    const newUser = await User.create({
      name,
      email,
      picture,
      google_auth: true
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: `Error inserting into database: ${err}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    await User.destroy({ where: { user_id } });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
};

const addAddress = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { street_address, city, state, postal_code } = req.body;
    if (!street_address || !city || !state || !postal_code) {
      return res.status(400).json({ message: "Fill the complete address" });
    }
    const newAddress = await Address.create({
      user_id,
      street_address,
      city,
      state,
      postal_code
    });
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(400).json({ message: `Error inserting into database: ${err}` });
  }
};

const getAddressByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const addresses = await Address.findAll({ where: { user_id } });
    if (addresses.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(addresses);
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { address_id } = req.params;
    await Address.destroy({ where: { address_id } });
    res.status(200).json({ message: "Address deleted" });
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
};

const getUserAndAddress = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      include: [{ model: Address }]
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
};

module.exports = {
  allUsers,
  specificUser,
  createUser,
  checkUser,
  deleteUser,
  addAddress,
  getAddressByUser,
  deleteAddress,
  getUserAndAddress
};
