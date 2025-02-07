import { isValidGameID } from "@/app/lib/data";
import GameInfo from "../ui/game/game-info";
import GameBody from "../ui/game/game-body";

export default async function Page(props: {
  searchParams?: Promise<{
    g?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const gameID = Number(searchParams?.g) || -1;
  const isValidGameId = await isValidGameID(gameID);
  return (
    <div className="px-2">
      {isValidGameId && (
        <>
          <GameInfo gameID={gameID} />
          <GameBody gameID={gameID} />
        </>
      )}
      {!isValidGameId && (
        <>
          <p>Url je napačen: g={gameID}</p>
          <p>Zgled pravilnega URL-ja:</p>
          <p>.../game?g=1</p>
        </>
      )}
    </div>
  );
}
