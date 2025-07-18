import React, { useState } from "react";
import axios from "axios";

const AddUserForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await axios.post("https://leaderboard-web-page.onrender.com/api/users", { name });
      setName("");
      onAdd();
    } catch (error) {
      alert("Failed to add user. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user">
      <input
        className="input"
        type="text"
        placeholder="Enter name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <button
        className="add-btn"
        onClick={handleAdd}
        disabled={!name.trim() || loading}
      >
        {loading ? "Adding..." : "Add User"}
      </button>
    </div>
  );
};

export default AddUserForm;
