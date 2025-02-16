import { UserButton } from "@clerk/nextjs";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import GameRow from "./game-row";
import { getPlayersGames } from "../lib/data";
import NewGameForm from "./new-game";
import AddGameBtn from "./add-game-btn";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return <div>loading...</div>;
  }

  const client = await clerkClient();
  const userData = await client.users.getUserList();
  const userList = userData.data;
  const simplifiedUserList = userList.map((user) => ({
    id: user.id,
    username: user.username,
  }));
  console.log(simplifiedUserList);

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
      <div className="flex items-center bg-gray-200 text-gray-400 gap-4 mb-2 p-4">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10",
            },
          }}
        />
        <p className="text-4xl">{user?.username}</p>
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
        <NewGameForm userList={simplifiedUserList} creator={user.username} />
      </div>
    </div>
  );
}
