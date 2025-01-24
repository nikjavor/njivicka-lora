import { getPlayerUsernamesFromGame, getGameInfo } from "@/app/lib/data";

export default async function ShowcaseInfo({ gameID }: { gameID: number }) {
  const usernames = await getPlayerUsernamesFromGame(gameID);
  const players = usernames.map((username, index) => {
    return (
      <p
        key={index}
      >
        p{index+1}: {username}
      </p>
    );
  });
  const gameInfo = await getGameInfo(gameID);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center">{gameInfo.title}</h1>
      <p className="text-center mt-1 mb-2.5">
        {gameInfo.creation_date.toUTCString().slice(5, 16)}
      </p>
      <div className="grid grid-cols-2 w-fit mb-4">{players}</div>
    </div>
  );
}
