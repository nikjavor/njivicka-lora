import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export default function Page() {
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
        <p className="text-4xl">USERNAME</p>
      </div>
      <div className="p-4">
        <div className="text-left border-2 rounded-md p-4 pb-24 mb-6">
          <p className="text-gray-400">Player stats:</p>
        </div>
        <div>
          <div className="flex gap-1 mb-1">
            <div className="border-2 p-1 rounded-md">
              <Plus className="text-gray-400" />
            </div>
            <div className="border-2 rounded-md w-full">
              <input
                type="text"
                placeholder=" Search games..."
                className=" w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="text-left border-2 rounded-md p-4 pb-60"></div>
      </div>
    </div>
  );
}
