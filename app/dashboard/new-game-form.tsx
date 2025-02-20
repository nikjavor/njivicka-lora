"use client";

import React, { useState } from "react";
import { MAX_GAME_TITLE_LENGTH } from "@/app/lib/constants";
import { createGame, doesUsernameExist, getUserUsername } from "@/app/lib/data";
import { redirect } from "next/navigation";

export default function NewGameForm({ creatorID }: { creatorID: string }) {
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
      alert("Bro, you gotta have a game title!");
      return false;
    }
    if (gameTitle.length > MAX_GAME_TITLE_LENGTH) {
      alert(
        `Bro, your game title is too long! It must be less than ${MAX_GAME_TITLE_LENGTH} characters.`
      );
      return false;
    }

    if (!players.some(async (player) => player === await getUserUsername(creatorID))) {
      alert("Bro, you gotta be in the game too!");
      return false;
    }

    if (
      !players.every(async (player) => await doesUsernameExist(player))
    ) {
      alert("Bro, you can't play with people who don't exist!");
      return false;
    }

    if (new Set(players).size !== 4) {
      alert("Bro, you can't have duplicate players!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof creatorID !== "string") {
      alert("Bro, you don't exist! JK, something went wrong.");
      return false;
    }
    if (validateForm()) {
      const submit = document.querySelector("button[type=submit]");
      if (submit) {
        submit.textContent = "Loading...";
      }

      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        button.disabled = true;
      });

      console.log("Creating game...");
      const gameID = await createGame(creatorID, gameTitle, players);
      console.log("Game created:", gameID);
      redirect(`/game/?g=${gameID}`);
    }
    console.log("Game Title:", gameTitle);
    console.log("Players:", players);
  };

  return (
    <div className="bg-white">
      <div id="game-form-main-div" className="mt-10 p-6 rounded-lg shadow-md">
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
      <div id="game-form-loading" className="hidden">
        Loading
      </div>
    </div>
  );
}
