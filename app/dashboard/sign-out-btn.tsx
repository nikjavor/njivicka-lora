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
      className="px-4 py-2 bg-secondary text-white rounded-md shadow-md transition hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-light"
    >
      Odjava
    </button>
  );
}

