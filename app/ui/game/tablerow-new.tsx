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
    <tr className="border-b-2 text-center border-black">
      <td className="py-2 flex justify-center">
        <X
          color="red"
          className="cursor-pointer"
          onClick={() => {
            confirm("Res želiš izbrisati ta krog?");
          }}
        />
        &nbsp;
      </td>
      <td className="py-2">
        <input
          type="number"
          onChange={(e) => {
            handleInput(e.target.value, 1);
          }}
          id="0"
          defaultValue={searchParams.get("p1")?.toString()}
          className={clsx("border-2 rounded-md w-full text-center", {
            "border-black": master === 0,
          })}
        />
      </td>
      <td className="py-2">
        <input
          type="number"
          onChange={(e) => {
            handleInput(e.target.value, 2);
          }}
          id="1"
          defaultValue={searchParams.get("p2")?.toString()}
          className={clsx("border-2 rounded-md w-full text-center", {
            "border-black": master === 1,
          })}
        />
      </td>
      <td className="py-2">
        <input
          type="number"
          onChange={(e) => {
            handleInput(e.target.value, 3);
          }}
          id="2"
          defaultValue={searchParams.get("p3")?.toString()}
          className={clsx("border-2 rounded-md w-full text-center", {
            "border-black": master === 2,
          })}
        />
      </td>
      <td className="py-2">
        <input
          type="number"
          onChange={(e) => {
            handleInput(e.target.value, 4);
          }}
          id="3"
          defaultValue={searchParams.get("p4")?.toString()}
          className={clsx("border-2 rounded-md w-full text-center ", {
            "border-black": master === 3,
          })}
        />
      </td>
      <td className="py-2 flex justify-center">
        <div className="relative">
          <div
            className="cursor-pointer px-2 flex items-center justify-center"
            onClick={() => {
              const dropdown = document.querySelector("#minigame-list");
              dropdown?.classList.toggle("hidden");
            }}
          >
            <minigame.icon />
          </div>
          <div
            id="minigame-list"
            className="absolute z-10 bg-white border rounded mt-1 w-full hidden"
          >
            {filteredMinigames.map((game) => (
              <div
                key={game.label}
                className="flex items-center p-2 cursor-pointer"
                onClick={() => {
                  setMinigame(game);
                  const params = new URLSearchParams(searchParams);
                  params.set("mgame", game.label);
                  replace(`${pathname}?${params.toString()}`);
                  const dropdown = document.querySelector("#minigame-list");
                  dropdown?.classList.add("hidden");
                }}
              >
                <game.icon />
              </div>
            ))}
          </div>
        </div>
      </td>
    </tr>
  );
}
