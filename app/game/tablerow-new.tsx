"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  BriefcaseMedical,
  Gem,
  Crown,
  HeartOff,
  SquareDashed,
  ToyBrick,
  X,
} from "lucide-react";

const minigameIcons = [
  { icon: SquareDashed, label: "" },
  { icon: ArrowUpFromLine, label: "max" },
  { icon: ArrowDownFromLine, label: "min" },
  { icon: HeartOff, label: "srca" },
  { icon: Gem, label: "dame" },
  { icon: Crown, label: "kralj" },
  { icon: BriefcaseMedical, label: "prognoza" },
  { icon: ToyBrick, label: "lora" },
];

export default function TableRowNew({
  unusedMinigames,
  master,
}: {
  unusedMinigames: { id: number; minigame: string; short: string }[];
  master: number;
}) {
  const [minigame, setMinigame] = useState(minigameIcons[0]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleInput(term: string, player: number) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("p" + player, term);
    } else {
      params.delete("p" + player);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // Filter minigameIcons based on unusedMinigames
  const filteredMinigames = minigameIcons.filter((game) =>
    unusedMinigames.some((unused) => unused.short === game.label)
  );

  return (
    <tr className="border-b-2 text-center border-neutral-dark bg-white hover:bg-neutral-light transition">
      {/* Delete Round Button */}
      <td className="py-3.5 flex justify-center">
        <X
          size={28}
          className="mr-3 cursor-pointer text-danger hover:text-danger-dark transition"
          onClick={() => {
            confirm("Res želiš izbrisati ta krog?");
          }}
        />
      </td>

      {/* Player Inputs */}
      {[0, 1, 2, 3].map((playerIndex) => (
        <td key={playerIndex} className="py-2">
          <input
            type="number"
            onChange={(e) => handleInput(e.target.value, playerIndex + 1)}
            id={`player${playerIndex}`}
            defaultValue={searchParams.get(`p${playerIndex + 1}`)?.toString()}
            className={clsx(
              "border-2 rounded-md w-full text-center p-2 focus:outline-none focus:ring-2 ",
              {
                "border-secondary font-bold focus:ring-secondary-light": master === playerIndex,
                "border-neutral focus:ring-neutral": master !== playerIndex,
              }
            )}
          />
        </td>
      ))}

      {/* Minigame Selection */}
      <td className="py-2 flex justify-center">
        <div className="relative">
          <div
            className="cursor-pointer px-2 flex items-center justify-center text-secondary hover:text-secondary-dark transition"
            onClick={() => {
              const dropdown = document.querySelector("#minigame-list");
              dropdown?.classList.toggle("hidden");
            }}
          >
            <minigame.icon />
          </div>
          <div
            id="minigame-list"
            className="absolute z-10 bg-white border border-neutral-dark rounded-md mt-1 hidden shadow-md"
          >
            {filteredMinigames.map((game) => (
              <div
                key={game.label}
                className="flex items-center p-2 gap-2 cursor-pointer hover:bg-neutral-light transition"
                onClick={() => {
                  setMinigame(game);
                  const params = new URLSearchParams(searchParams);
                  params.set("mgame", game.label);
                  replace(`${pathname}?${params.toString()}`);
                  const dropdown = document.querySelector("#minigame-list");
                  dropdown?.classList.add("hidden");
                }}
              >
                <game.icon className="text-secondary" />
                {game.label}
              </div>
            ))}
          </div>
        </div>
      </td>
    </tr>
  );
}
