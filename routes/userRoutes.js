const express = require("express");
const router = express.Router();
const { allUsers , specificUser , createUser } = require("../controllers/userControllers");

router.get("/all",allUsers);
router.get("/specific/:id",specificUser);

router.post("/create",createUser);

module.exports = router;