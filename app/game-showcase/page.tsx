import { isValidGameID } from "@/app/lib/data";
import ShowcaseBody from "../ui/game-showcase/showcase-body";
import ShowcaseInfo from "../ui/game-showcase/showcase-info";

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
          <ShowcaseInfo gameID={gameID} />
          <ShowcaseBody />
        </>
      )}
      {!isValidGameId && (
        <>
          <p>Url je napačen: g={gameID}</p>
          <p>Zgled pravilnega URL-ja:</p>
          <p>...vercel.app/game?g=1</p>
        </>
      )}
    </div>
  );
}
