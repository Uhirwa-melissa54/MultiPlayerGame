import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    // Listen for player updates
    socket.on("playerList", (data) => {
      setPlayers(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !score) return;

    const playerData = { socketId: socket.id, name, score };
    socket.emit("addPlayer", playerData);

    setName("");
    setScore("");
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎮 Multiplayer Scoreboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Live Players</h2>
      <ul style={{ listStyle: "none" }}>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}: {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
