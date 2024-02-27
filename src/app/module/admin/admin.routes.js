const express = require("express");
const { blockUser, unBlockUser } = require("./admin.controller");

const router = express.Router();

router.patch("/user-block/:userId", blockUser);
router.patch("/user-unblock/:userId", unBlockUser);

module.exports = router;
