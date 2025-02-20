"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function SignOut() {
  const handleSignOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-gray-300 hover:bg-gray-400 transition-colors text-white px-2 py-1 rounded-md"
    >
      Sign Out
    </button>
  );
}
