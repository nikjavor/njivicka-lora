"use client";
import { useState, useEffect } from "react";
import {
  getPlayerIdsFromGame,
  getRounds,
  getRoundScores,
} from "@/app/lib/data";
import AddActionButtons from "./game-action-buttons";

export default function GameBody({ gameID }: { gameID: number }) {
  const [roundScores, setRoundScores] = useState<
    Record<number, Record<number, number | null>>
  >({});

  async function fetchRoundsAndScores() {
    const rounds = await getRounds(gameID);
    const IDs = await getPlayerIdsFromGame(gameID);

    const scoresByRound: Record<number, Record<number, number | null>> = {};

    for (const round of rounds) {
      const scores = await getRoundScores(round.id);
      scoresByRound[round.id] = IDs.reduce((acc, playerId) => {
        acc[playerId] =
          scores.find((s) => s.player_id === playerId)?.value || null;
        return acc;
      }, {} as Record<number, number | null>);
    }

    setRoundScores(scoresByRound);
  }

  function handleInputChange(roundId: number, playerId: number, value: string) {
    setRoundScores((prev) => ({
      ...prev,
      [roundId]: {
        ...prev[roundId],
        [playerId]: value === "" ? null : parseInt(value, 10),
      },
    }));
  }

  useEffect(() => {
    fetchRoundsAndScores();
  }, []);

  return (
    <>
      <table className="w-full table-fixed mb-8">
        <tbody>
          {Object.entries(roundScores).map(([roundId, playerScores], index) => (
            <tr key={index} className="text-center">
              {Object.entries(playerScores).map(([playerId, value]) => (
                <td key={playerId}>
                  <input
                    type="number"
                    value={value ?? ""}
                    className="w-1/2"
                    onChange={(e) =>
                      handleInputChange(
                        Number(roundId),
                        Number(playerId),
                        e.target.value
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <AddActionButtons gameID={gameID} roundScores={roundScores} />
    </>
  );
}
