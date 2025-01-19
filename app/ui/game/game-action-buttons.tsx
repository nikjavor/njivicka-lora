'use client'

import { addRound } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import { manrope } from "../fonts";

// TODO update page when new round is added

function AddRoundButton({ gameID }: { gameID: number }) {
  const router = useRouter();
  async function handleAddRound() {
    try {
      await addRound(gameID)
      router.refresh();
    } catch (error) {
      console.error("Error fetching last round:", error);
    }
  }
  return (
    <button
      className={`${manrope.className} antialiased font-bold bg-black text-white rounded-full py-2 px-4`}
      onClick={handleAddRound}
      >
      ADD ROUND
    </button>
  );
}

function SaveButton() {
  return (
    <button
      className={`${manrope.className} antialiased font-bold bg-black text-white rounded-full py-2 px-4`}
    >
      SAVE
    </button>
  );
}

export default function AddActionButtons({ gameID }: { gameID: number }) {
  return (
    <div className="flex gap-4 justify-center">
      <AddRoundButton gameID={gameID} />
      <SaveButton />
    </div>
  );
}
