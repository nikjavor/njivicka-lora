import { Puzzle } from "lucide-react";
import TableRow from "./tablerow";
import TableRowNew from "./tablerow-new";
import NextRoundButton from "./addnext-button";
import { getRoundInfos, getUnusedMinigames, getRoundInfo } from "@/app/lib/data";

export default async function GameBody({ gameID }: { gameID: number }) {
  const rounds = await getRoundInfos(gameID);
  const rows = [];
  let lastRow = null;
  let unusedMinigames = [];

  for (const round of rounds) {
    if (
      round.p1 !== null &&
      round.p2 !== null &&
      round.p3 !== null &&
      round.p4 !== null &&
      round.minigame !== null
    ) {
      rows.push(<TableRow key={round.id} roundID={round.id} />);
    } else {
      lastRow = round;
      unusedMinigames = await getUnusedMinigames(gameID, round.round_master);
      const thisRound = await getRoundInfo(round.id);
      const master = thisRound.master;
      rows.push(<TableRowNew key={round.id} unusedMinigames={unusedMinigames} master={master} />);
      break;
    }
  }

  return (
    <>
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b-4 border-black border-double">
            <th className="mb-6">Nº</th>
            <th className="text-center">p1</th>
            <th className="text-center">p2</th>
            <th className="text-center">p3</th>
            <th className="text-center">p4</th>
            <th className="flex justify-center">
              <Puzzle />
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <NextRoundButton
          lastRound={lastRow}
          unusedMinigames={unusedMinigames}
        />
      </div>
    </>
  );
}
