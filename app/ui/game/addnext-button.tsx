"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { addRoundScoresAndMinigame } from "@/app/lib/data";

interface Round {
  id: number;
  game_id: number;
  game_name: string;
  round_number: number;
  round_master: number;
  p1: number | null;
  p2: number | null;
  p3: number | null;
  p4: number | null;
  selected_minigame: string | null;
}


interface NextRoundButtonProps {
  lastRound?: Round;
  unusedMinigames?: { short: string }[];
}

export default function NextRoundButton({
  lastRound = {} as Round,
  unusedMinigames = [],
}: NextRoundButtonProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = async () => {
    const paramsCheck = (str: string | undefined) => {
      if (typeof str === "undefined" || str.trim() === "" || isNaN(Number(str)))
        return false;
      const num = Number(str);
      return Number.isInteger(num) && num >= -76 && num <= 512;
    };

    let playersOk = true;
    const playerScores: { [playerId: number]: number | null } = {};
    for (const i of [1, 2, 3, 4]) {
      const param = searchParams.get("p" + i)?.toString();
      if (!param || !paramsCheck(param)) {
        playersOk = false;
        break;
      }
      playerScores[i] = param ? Number(param) : null;
    }

    const selectedMinigame = searchParams.get("mgame");
    if (
      playersOk &&
      unusedMinigames.some((minigame) => minigame.short === selectedMinigame)
    ) {
      try {
        await addRoundScoresAndMinigame(
          lastRound.game_id,
          lastRound.id,
          playerScores,
          selectedMinigame!
        );
        alert("Shranjeno v bazi");
        const params = new URLSearchParams();
        params.set("g", lastRound.game_id.toString());
        replace(`${pathname}?${params.toString()}`);
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error("Error adding scores and minigame:", error);
      }
    } else {
      alert("Prišlo je do napake pri shranjevanju podatkov");
    }
  };

  return (
    <button
      className="bg-black text-white text-lg font-bold text-center rounded-full py-2.5 col-span-2"
      onClick={handleClick}
    >
      Next Round
    </button>
  );
}
