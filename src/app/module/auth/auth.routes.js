const express = require("express");
const router = express.Router();

router.post("/register", userController.signup);
router.post("/login", userController.findUserByEmail);

export const authRoutes = router;
