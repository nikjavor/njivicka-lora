"use client";

import { Plus } from "lucide-react";

export default function AddGameBtn() {
  return (
    <div
      className="border-2 p-1 rounded-md cursor-pointer"
      onClick={() => {
        const formdiv = document.getElementById("new-game-form");
        formdiv?.classList.toggle("hidden");
      }}
    >
      <Plus className="text-gray-400" />
    </div>
  );
}
