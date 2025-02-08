"use client"

import { useState } from "react";
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
    { icon: ArrowUpFromLine, label: "Maximum" },
    { icon: ArrowDownFromLine, label: "Minimum" },
    { icon: HeartOff, label: "Srca" },
    { icon: Gem, label: "Dame" },
    { icon: Crown, label: "Kralj" },
    { icon: BriefcaseMedical, label: "Prognoza" },
    { icon: ToyBrick, label: "Lora" },
  ];

export default function TableRowNew() {
    const [minigame, setMinigame] = useState(minigameIcons[0])
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
            <td className="py-2"><input type="number" name="" id="" className="border-2 rounded-md w-full text-center border-gray-300" /></td>
            <td className="py-2"><input type="number" name="" id="" className="border-2 rounded-md w-full text-center border-gray-300" /></td>
            <td className="py-2"><input type="number" name="" id="" className="border-2 rounded-md w-full text-center border-gray-300" /></td>
            <td className="py-2"><input type="number" name="" id="" className="border-2 rounded-md w-full text-center border-black" /></td>
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
                  {minigameIcons.slice(1).map((game) => (
                    <div
                      key={game.label}
                      className="flex items-center p-2 cursor-pointer"
                      onClick={() => {
                        setMinigame(game);
                        const dropdown =
                          document.querySelector("#minigame-list");
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
    )
}