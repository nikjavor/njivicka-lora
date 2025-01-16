import { getPlayerUsernamesFromGame, getGameInfo, isValidGameID } from "@/app/lib/data";

async function GameInfo({ gameID }: { gameID: number }) {
  const usernames = await getPlayerUsernamesFromGame(gameID);
  const players = usernames.map((username, index) => {
    return (
      <td key={index} className="text-center text-xs border-r border-black last:border-0">
        {username}
      </td>
    );
  });
  const gameInfo = await getGameInfo(gameID);
  return (
    <>
      <h1 className="text-4xl text-center">{gameInfo.title}</h1>
      <p className="text-center mt-1 mb-2.5 ">{gameInfo.creation_date.toUTCString().slice(5, 16)}</p>
      <table className="w-full">
        <tbody className="border-red-500">
          <tr className="border-green-500">
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
  const gameID = Number(searchParams?.g) || -1;
  const isValidGameId = await isValidGameID(gameID)
  return (
    <>
      {isValidGameId && <GameInfo gameID={gameID} />}
    </>
  );
}
