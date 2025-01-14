import { getPlayers } from "@/app/lib/data";

async function GameInfo({
  p1,
  p2,
  p3,
  p4,
}: {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
}) {
  const response = await getPlayers(p1, p2, p3, p4);

  const players = response.map((player, index) => {
    return (
      <td key={player.id}>
        p{index + 1}:{player.username}
      </td>
    );
  });
  return (
    <>
      <h1 className="text-4xl text-center">Game Name</h1>
      <p className="text-center">2.12.2005</p>
      <table className="w-full">
        <tbody className="border-red-500">
          <tr className="border-green-500 *:text-center *:text-xs">
            {players}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function Page() {
  return (
    <>
      <GameInfo p1={2} p2={3} p3={4} p4={5} />
    </>
  );
}
