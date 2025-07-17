
const User = require("../model/user");
const ClaimHistory = require("../model/claimhistory");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "User name is required" });

    const user = new User({ name, points: 0 });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
};

// Claim random points for a user
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.points += points;
    await user.save();

    const history = new ClaimHistory({
      userId,
      pointsClaimed: points,
      claimedAt: new Date(),
    });
    await history.save();

    res.status(200).json({ message: "Points claimed successfully", points, user });
  } catch (err) {
    res.status(500).json({ message: "Error claiming points", error: err.message });
  }
};

// Get dynamic leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      points: user.points,
    }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard", error: err.message });
  }
};

// Get all claim history records
exports.getClaimHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate("userId", "name")
      .sort({ claimedAt: -1 });

    const formatted = history.map(h => ({
      name: h.userId?.name,
      points: h.pointsClaimed,
      claimedAt: h.claimedAt,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Error fetching claim history", error: err.message });
  }
};
