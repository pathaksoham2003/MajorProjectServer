const express = require("express");
const router = express.Router();
const { allUsers , specificUser , createUser ,  deleteUser} = require("../controllers/userControllers");

router.get("/all",allUsers);
router.get("/specific/:google_id",specificUser);

router.post("/create",createUser);

router.delete("/delete/:google_id",deleteUser);
module.exports = router;