import { getPlayerUsernamesFromGame } from "@/app/lib/data";
import { getGameInfo } from "@/app/lib/data";

async function GameInfo({ gameID }: { gameID: number }) {
  // const response = await getPlayers(p1, p2, p3, p4);
  const usernames = await getPlayerUsernamesFromGame(gameID);
  const players = usernames.map((username, index) => {
    return (
      <td key={index}>
        p{index + 1}:{username}
      </td>
    );
  });
  const gameInfo = await getGameInfo(gameID);
  return (
    <>
      <h1 className="text-4xl text-center">{gameInfo.title}</h1>
      <p className="text-center">{gameInfo.creation_date.toUTCString().slice(5, 16)}</p>
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

export default async function Page(props: {
  searchParams?: Promise<{
    g?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const gameID = Number(searchParams?.g) || 0;

  return (
    <>
      <GameInfo gameID={gameID} />
    </>
  );
}
