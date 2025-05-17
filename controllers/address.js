const {Address} = require("../models/associations");
const {Op} = require("sequelize");

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: {
        user_id: req.id,
      },
    });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addAddress = async (req, res) => {
  try {
    const {street_address, city, state, postal_code, country,isDefault} = req.body;
    const addressObj = await Address.create({
      street_address,
      city,
      state,
      postal_code,
      country,
      isDefault,
      user_id: req.id,
    });
    res.status(200).json(addressObj);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateAddress = async (req, res) => {
  try {
    const {id} = req.params;
    const {street_address, city, state, postal_code, country, isDefault} = req.body;
    const addressObj = await Address.update({
      street_address,
      city,
      state,
      postal_code,
      country,
      isDefault,
    }, {
      where: {
        id,
      },
    });
    res.status(200).json(addressObj);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const {id} = req.params;
    await Address.destroy({
      where: {
        id,
        user_id: req.id,
      },
    });
    res.status(200).json({message: "Address deleted successfully"});
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const setDefaultAddress = async (req, res) => {
  try {
    const {id} = req.params;
    await Address.update({
      isDefault: true,
    }, {
      where: {
        id,
        user_id: req.id,
      },
    });
    await Address.update({
      isDefault: false,
    }, {
      where: {
        id: {
          [Op.ne]: id,
        },
        user_id: req.id,
      },
    });
    res.status(200).json({message: "Address set as default successfully"});
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress};
