"use client";

import { Plus } from "lucide-react";

export default function AddGameBtn() {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-md shadow-md cursor-pointer hover:bg-primary-dark transition"
      onClick={() => {
        const formdiv = document.getElementById("new-game-form");
        formdiv?.classList.toggle("hidden");
      }}
    >
      <Plus className="w-6 h-6" />
    </div>
  );
}

