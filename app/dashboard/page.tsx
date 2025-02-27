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
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <div className="flex items-center justify-between bg-primary text-white px-6 py-4 shadow-md">
        <p className="text-3xl font-semibold">Uporabnik: {username}</p>
        <SignOut />
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* Stats Box */}
        <div className="bg-white border border-neutral-dark rounded-lg p-4 mb-6 shadow-md">
          <p className="text-neutral text-center">Statistika igralca: <span className="text-gray-400">(Prihaja kmalu)</span></p>
        </div>

        {/* Add Game & Search */}
        <div className="flex gap-2 mb-4">
          <AddGameBtn />
          <div className="border border-neutral rounded-md w-full bg-white flex items-center shadow-sm">
            <input
              type="text"
              placeholder="Išči igre..."
              className="w-full h-full py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
        </div>

        {/* Game List */}
        <div className="bg-white border border-neutral-dark rounded-md p-3 shadow-md min-h-60">
          {gameRows.length > 0 ? (
            gameRows
          ) : (
            <p className="text-center text-neutral-dark">Ni ustvarjenih iger.</p>
          )}
        </div>
      </div>

      {/* New Game Form (Hidden by Default) */}
      <div
        id="new-game-form"
        className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-lg bg-white p-6 rounded-lg shadow-lg border border-neutral-dark"
      >
        <NewGameForm creatorID={user.id} />
      </div>
    </div>
  );
}
