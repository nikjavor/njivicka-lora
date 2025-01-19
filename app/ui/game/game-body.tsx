import {
  getPlayerIdsFromGame,
  getRounds,
  getRoundScores,
} from "@/app/lib/data";
import { Score } from "@/app/lib/definitions";
import AddActionButtons from "./game-action-buttons";

export default async function GameBody({ gameID }: { gameID: number }) {
  const rounds = await getRounds(gameID);
  const IDs = await getPlayerIdsFromGame(gameID);

  function findValue(scores: Array<Score>, playerID: number) {
    let value;
    scores.forEach((score) => {
      if (score.player_id === playerID) {
        value = score?.value;
      }
    });
    return value;
  }

  const rows = rounds.map(async (round, index) => {
    const scores = await getRoundScores(round.id);
    const players = Object.values(IDs).map((player, i: number) => {
      return (
        <td key={i}>
          <input
            type="number"
            defaultValue={findValue(scores, player)}
            className="w-1/2"
          />
        </td>
      );
    });

    return (
      <tr key={index} className="*:text-center">
        {players}
      </tr>
    );
  });

  return (
    <>
      <table className="w-full table-fixed mb-8">
        <tbody>
          {rows}
        </tbody>
      </table>
        <AddActionButtons gameID={gameID}/>
    </>
  );
}
