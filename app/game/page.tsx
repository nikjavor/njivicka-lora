import { isValidGameID } from "@/app/lib/data";
import GameInfo from "../ui/game/game-info";
import GameBody from "../ui/game/game-body";
// import { getValidRounds, getRoundInfo } from "@/app/lib/data";

export default async function Page(props: {
  searchParams?: Promise<{
    g?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const gameID = Number(searchParams?.g) || -1;
  const isValidGame = await isValidGameID(gameID);
  if (isValidGame) {
    // const validRounds = await getValidRounds(gameID);
    return (
      <div className="px-2">
        <GameInfo gameID={gameID} />
        <GameBody gameID={gameID} />
      </div>
    );
  } else {
    <div className="px-2">
      <p>Url je napačen: g={gameID}</p>
      <p>Zgled pravilnega URL-ja:</p>
      <p>.../game?g=1</p>
    </div>;
  }
}
