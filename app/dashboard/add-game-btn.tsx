"use client";

import { Plus } from "lucide-react";

export default function AddGameBtn() {
  return (
    <div
      className="border-2 p-1 rounded-md"
      onClick={() => {
        const formdiv = document.getElementById("new-game-form");
        formdiv?.classList.remove("hidden");
      }}
    >
      <Plus className="text-gray-400" />
    </div>
  );
}
