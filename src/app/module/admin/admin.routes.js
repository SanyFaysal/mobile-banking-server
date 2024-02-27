const express = require("express");
const {
  blockUser,
  unBlockUser,
  getAgentRequests,
  approveAgent,
  rejectAgent,
} = require("./admin.controller");

const router = express.Router();

router.get("/agent-request", getAgentRequests);
router.patch("/approve-agent/:agentId", approveAgent);
router.patch("/reject-agent/:agentId", rejectAgent);
router.patch("/user-block/:userId", blockUser);
router.patch("/user-unblock/:userId", unBlockUser);

module.exports = router;
