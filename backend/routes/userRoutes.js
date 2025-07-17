const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getClaimHistory,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", addUser);
router.post("/claim", claimPoints);
router.get("/leaderboard", getLeaderboard);
router.get("/history", getClaimHistory);

module.exports = router;
