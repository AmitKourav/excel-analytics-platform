const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getPendingAdmins,
  approveAdmin,
} = require("../controllers/authController");
const { isSuperAdmin } = require('../middleware/authMiddleware');


router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/pending-admins", isSuperAdmin, getPendingAdmins);
router.put("/approve-admin/:id", isSuperAdmin, approveAdmin);

module.exports = router;
