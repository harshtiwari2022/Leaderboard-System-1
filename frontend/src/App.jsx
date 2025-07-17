import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserSelector from "./components/UserSelector.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import AddUserForm from "./components/AddUserForm.jsx";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [lastPoints, setLastPoints] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      alert("Failed to fetch users.");
      console.error(error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/leaderboard");
      setLeaderboard(res.data);
    } catch (error) {
      alert("Failed to fetch leaderboard.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  const handleClaim = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/users/claim", {
        userId: selectedUserId,
      });
      setLastPoints(res.data.points);
      await fetchUsers();
      await fetchLeaderboard();
    } catch (error) {
      alert("Failed to claim points.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🔥 Leaderboard System</h1>
      <AddUserForm onAdd={fetchUsers} />
      <UserSelector
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <button
        className="claim-btn"
        onClick={handleClaim}
        disabled={!selectedUserId || loading}
      >
        {loading ? "Claiming..." : "Claim Points"}
      </button>
      {lastPoints !== null && (
        <p className="last-points">Last Points: +{lastPoints}</p>
      )}
      <Leaderboard data={leaderboard} />
    </div>
  );
};

export default App;
