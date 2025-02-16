import { getPlayersGameIds } from "@/app/lib/data";
import GameInfo from "../ui/game/game-info";
import GameBody from "../ui/game/game-body";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page(props: {
  searchParams?: Promise<{
    g?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const gameID = Number(searchParams?.g) || -1;

  const user = await auth();
  if (!user) {
    redirect("/");
  }

  const usersGames = await getPlayersGameIds(user.userId);
  if (usersGames.includes(gameID)) {
    return (
      <div className="px-2">
        <GameInfo gameID={gameID} />
        <GameBody gameID={gameID} />
        <Link href="/dashboard" className="mt-10 inline-block text-gray-500 hover:text-gray-700">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  } else {
    redirect("/dashboard");
  }
}
