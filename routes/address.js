
const express = require("express")
const AddressController = require("../controllers/address")
const router = express.Router()
const checkRole = require("../middleware/authentication");

router.get("/",checkRole("buyer"),AddressController.getAddresses)
router.post("/",checkRole("buyer"),AddressController.addAddress)
router.put("/:id",checkRole("buyer"),AddressController.updateAddress)
router.delete("/:id",checkRole("buyer"),AddressController.deleteAddress)
router.put("/:id/default",checkRole("buyer"),AddressController.setDefaultAddress)

module.exports = router;
