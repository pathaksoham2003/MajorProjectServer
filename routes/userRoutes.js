const express = require("express");
const router = express.Router();
const { allUsers , specificUser } = require("../controllers/userControllers");

router.get("/all",allUsers);
router.get("/specific/:id",specificUser);

module.exports = router;