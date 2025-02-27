import { Puzzle } from "lucide-react";
import TableRow from "./tablerow";
import TableRowNew from "./tablerow-new";
import NextRoundButton from "./addnext-button";
import {
  getRoundInfos,
  getUnusedMinigames,
  getRoundInfo,
} from "@/app/lib/data";
import { UnusedMinigames, Round } from "@/app/lib/definitions";

export default async function GameBody({ gameID }: { gameID: number }) {
  const rounds = await getRoundInfos(gameID);
  const rows = [];
  let lastRow: Round | undefined = undefined;
  let unusedMinigames = [] as UnusedMinigames[];

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
      lastRow = round as Round;
      unusedMinigames = await getUnusedMinigames(gameID, round.round_master);
      const thisRound = await getRoundInfo(round.id);
      const master = thisRound.master;
      rows.push(
        <TableRowNew
          key={round.id}
          unusedMinigames={unusedMinigames}
          master={master}
        />
      );
      break;
    }
  }

  return (
    <div className="bg-white border border-neutral-dark rounded-lg shadow-md p-4">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b-4 border-black border-double bg-neutral-light">
            <th className="text-center">Nº</th>
            <th className="text-center">P1</th>
            <th className="text-center">P2</th>
            <th className="text-center">P3</th>
            <th className="text-center">P4</th>
            <th className="p-2 flex justify-center"><Puzzle className="text-secondary" /></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral">
          {rows}
        </tbody>
      </table>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <NextRoundButton lastRound={lastRow} unusedMinigames={unusedMinigames} />
      </div>
    </div>
  );
}
