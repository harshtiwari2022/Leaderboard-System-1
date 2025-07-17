import React from "react";

const UserSelector = ({ users, selectedUserId, setSelectedUserId }) => {
  return (
    <select
      className="dropdown"
      value={selectedUserId}
      onChange={(e) => setSelectedUserId(e.target.value)}
    >
      <option value="">-- Select User --</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default UserSelector;
