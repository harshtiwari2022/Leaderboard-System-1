import React from "react";

const Leaderboard = ({ data }) => {
  return (
    <div className="leaderboard">
      <h2>🏆 Live Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            
            const rankClass = user.rank <= 3 ? `badge-rank-${user.rank}` : "badge";
            return (
              <tr key={user.name}>
                <td>
                  <span className={`badge ${rankClass}`}>{user.rank}</span>
                </td>
                <td>{user.name}</td>
                <td>{user.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
