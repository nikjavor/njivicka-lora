import { getPlayerIdsFromGame, getGameInfo, getUserUsername } from "@/app/lib/data";

export default async function GameInfo({ gameID }: { gameID: number }) {
  const gameInfo = await getGameInfo(gameID);
  const playerIds = await getPlayerIdsFromGame(gameID);
  const players = [];
  for (const id of playerIds) {
    const user = await getUserUsername(id);
    players.push(user);
  }

  return (
    <div className="flex flex-col items-center bg-white border border-neutral-dark rounded-lg shadow-md p-6 my-6">
      <h1 className="text-4xl font-bold text-primary text-center">{gameInfo.title}</h1>
      <p className="text-gray-500 text-center mt-1 mb-4">
        {new Date(gameInfo.creation_date).toLocaleDateString("en-GB")}
      </p>
      <div className="grid grid-cols-2 gap-x-6 text-neutral-dark text-lg font-medium">
        <p>P1: {players[0]}</p>
        <p>P3: {players[2]}</p>
        <p>P2: {players[1]}</p>
        <p>P4: {players[3]}</p>
      </div>
    </div>
  );
}
