const express = require("express");
const {
  blockUser,
  unBlockUser,
  getAgentRequests,
  approveAgent,
  rejectAgent,
} = require("./admin.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const { authorization } = require("../../middleware/authorization");
const { userRole } = require("../../constants");

const router = express.Router();

router.get(
  "/agent-request",
  verifyToken,
  authorization(userRole.admin),
  getAgentRequests
);
router.patch(
  "/approve-agent/:agentId",
  verifyToken,
  authorization(userRole.admin),
  approveAgent
);
router.patch(
  "/reject-agent/:agentId",
  verifyToken,
  authorization(userRole.admin),
  rejectAgent
);
router.patch(
  "/user-block/:userId",
  verifyToken,
  authorization(userRole.admin),
  blockUser
);
router.patch(
  "/user-unblock/:userId",
  verifyToken,
  authorization(userRole.admin),
  unBlockUser
);

module.exports = router;
