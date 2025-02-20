import GameRow from "./game-row";
import { getPlayersGames, getUserUsername } from "@/app/lib/data";
import NewGameForm from "./new-game-form";
import AddGameBtn from "./add-game-btn";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignOut from "./sign-out-btn";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  if (!user) {
    redirect("/");
  }

  const username = await getUserUsername(user?.id);

  const games = await getPlayersGames(user?.id);
  const gameRows = games.map((game) => {
    return (
      <GameRow
        key={game.id}
        id={game.id}
        title={game.title}
        creation_date={game.creation_date}
      />
    );
  });
  return (
    <div>
      <div className="flex items-center justify-between bg-gray-200 text-gray-400 gap-4 mb-2 p-4">
        <p className="text-4xl">{username}</p>
        <SignOut />
      </div>
      <div className="p-4">
        <div className="text-left border-2 rounded-md p-4 pb-24 mb-6">
          <p className="text-gray-400">Player stats: (coming soon)</p>
        </div>
        <div>
          <div className="flex gap-1 mb-1">
            <AddGameBtn />
            <div className="border-2 rounded-md w-full">
              <input
                type="text"
                placeholder=" Search games..."
                className=" w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="text-left border-2 rounded-md p-1 min-h-60">
          {gameRows}
        </div>
      </div>
      <div
        id="new-game-form"
        className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5"
      >
        <NewGameForm creatorID={user.id} />
      </div>
    </div>
  );
}
