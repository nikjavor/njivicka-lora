import { getPlayersGameIds } from "@/app/lib/data";
import GameInfo from "./game-info";
import GameBody from "./game-body";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Page(props: {
  searchParams?: Promise<{
    g?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const gameID = Number(searchParams?.g) || -1;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/");
  }
  const user = data.user;

  const usersGames = await getPlayersGameIds(user.id);
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
