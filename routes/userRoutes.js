const express = require("express");
const router = express.Router();
const { allUsers , specificUser , createUser ,  deleteUser , updateUser , addAddress , getAddressByUser , deleteAddress ,getUserAndAddress} = require("../controllers/userControllers");
// User Specific Routes
router.get("/all",allUsers);
router.get("/specific/:google_id",specificUser);

router.post("/create",createUser);

router.delete("/delete/:google_id",deleteUser);

// Address Specific Routes
router.get("/address/:user_id",getAddressByUser);
router.get("/addresswithuser/:user_id",getUserAndAddress);

router.post("/address/:user_id",addAddress);

router.delete("/address/:address_id",deleteAddress);


module.exports = router;