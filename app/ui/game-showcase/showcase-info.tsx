import { getPlayerUsernamesFromGame, getGameInfo } from "@/app/lib/data";

export default async function ShowcaseInfo({ gameID }: { gameID: number }) {
  const usernames = await getPlayerUsernamesFromGame(gameID);
  const gameInfo = await getGameInfo(gameID);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center">{gameInfo.title}</h1>
      <p className="text-center mt-1 mb-2.5">
        {gameInfo.creation_date.toUTCString().slice(5, 16)}
      </p>
      <div className="grid grid-cols-2 gap-x-6 w-fit mb-4">
        <p>p1: {usernames[0]}</p>
        <p>p3: {usernames[2]}</p>
        <p>p2: {usernames[1]}</p>
        <p>p4: {usernames[3]}</p>
      </div>
    </div>
  );
}
