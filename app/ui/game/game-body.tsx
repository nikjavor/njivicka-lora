import { Puzzle } from "lucide-react";
import { getValidRounds } from "@/app/lib/data";
import TableRow from "./tablerow";
import TableRowNew from "./tablerow-new";

export default async function GameBody({ gameID }: { gameID: number }) {
  const validRounds = await getValidRounds(gameID);
  const playedRows = validRounds.map((round) => (
    <TableRow key={round.id} roundID={round.id} />
  ));

  return (
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
      <tbody>
        {playedRows}
        <TableRowNew />
      </tbody>
    </table>
  );
}
