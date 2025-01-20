"use client";

import { addRound } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import { manrope } from "../fonts";
import { saveScores } from "@/app/lib/data";

function AddRoundButton({ gameID }: { gameID: number }) {
  const router = useRouter();
  async function handleAddRound() {
    try {
      await addRound(gameID);
      router.refresh();
    } catch (error) {
      console.error("Error fetching last round:", error);
    }
  }
  return <button onClick={handleAddRound}>ADD ROUND</button>;
}

function SaveButton({
  gameID,
  roundScores,
}: {
  gameID: number;
  roundScores: { [roundId: number]: { [playerId: number]: number | null } };
}) {
  async function handleSave() {
    try {
      await saveScores(gameID, roundScores);
      alert("Uspešno shranjeno!");
    } catch (error) {
      console.error("Failed to save scores:", error);
      alert("!!! Napaka pri shranjevanju !!!");
    }
  }

  return <button onClick={handleSave}>SAVE</button>;
}

export default function AddActionButtons({
  gameID,
  roundScores,
}: {
  gameID: number;
  roundScores: { [roundId: number]: { [playerId: number]: number | null } };
}) {
  return (
    <div
      className={`flex gap-4 justify-center *:${manrope.className} *:antialiased *:font-bold *:bg-black *:dark:bg-white *:text-white *:rounded-full *:py-2 *:px-4`}
    >
      <AddRoundButton gameID={gameID} />
      <SaveButton gameID={gameID} roundScores={roundScores} />
    </div>
  );
}
