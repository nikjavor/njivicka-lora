"use client";

import React, { useState } from "react";
import { MAX_GAME_TITLE_LENGTH } from "@/app/lib/constants";

export default function NewGameForm({ userList }: { userList: object[] }) {
  const [gameTitle, setGameTitle] = useState("");
  const [players, setPlayers] = useState(["", "", "", ""]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameTitle(e.target.value);
  };

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const closeForm = () => {
    const formdiv = document.getElementById("new-game-form");
    formdiv?.classList.toggle("hidden");
  };

  const validateForm = () => {
    if (gameTitle.length === 0) {
      alert("Please enter a game title.");
      return false;
    }
    if (gameTitle.length > MAX_GAME_TITLE_LENGTH) {
      alert(
        `Game title must be less than ${MAX_GAME_TITLE_LENGTH} characters.`
      );
      return false;
    }

    if (new Set(players).size !== 4) {
      alert("Please enter 4 unique player usernames");
      return false;
    }

    const playersExist = players.every((player) =>
      userList.some((user) => user.username === player)
    );
    if (!playersExist) {
      alert("Please enter a valid username for each player.");
      return false;
    }
    alert("Game added successfully!");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      closeForm();
    }
    console.log("Game Title:", gameTitle);
    console.log("Players:", players);
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Game</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="gameTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Game Title:
          </label>
          <input
            type="text"
            id="gameTitle"
            value={gameTitle}
            onChange={handleTitleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Players</h2>
          {players.map((player, index) => (
            <div key={index} className="mb-2">
              <label
                htmlFor={`player${index + 1}`}
                className="block text-sm font-medium text-gray-700"
              >
                Player {index + 1}:
              </label>
              <input
                type="text"
                id={`player${index + 1}`}
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex grow-0 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={closeForm}
          >
            Close
          </button>
          <button
            type="submit"
            className="inline-flex grow justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Game
          </button>
        </div>
      </form>
    </div>
  );
}
