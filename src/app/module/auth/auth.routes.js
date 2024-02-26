const { findUserByEmail, signup } = require("./auth.controller");

const express = require("express");
const router = express.Router();

router.post("/register", signup);
router.post("/login", findUserByEmail);

module.exports = router;
