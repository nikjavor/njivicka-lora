import { getPlayerIdsFromGame, getGameInfo } from "@/app/lib/data";
import { clerkClient } from "@clerk/nextjs/server";

export default async function GameInfo({ gameID }: { gameID: number }) {
  const client = await clerkClient();

  const gameInfo = await getGameInfo(gameID);
  const playerIds = await getPlayerIdsFromGame(gameID);
  const players = [];
  for (const id of playerIds) {
    const user = await client.users.getUser(id);
    players.push(user);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center">{gameInfo.title}</h1>
      <p className="text-center mt-1 mb-2.5">
        {gameInfo.creation_date.toUTCString().slice(5, 16)}
      </p>
      <div className="grid grid-cols-2 gap-x-6 w-fit mb-4">
        <p>p1: {players[0].username}</p>
        <p>p3: {players[2].username}</p>
        <p>p2: {players[1].username}</p>
        <p>p4: {players[3].username}</p>
      </div>
    </div>
  );
}
