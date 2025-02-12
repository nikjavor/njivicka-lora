import { SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();
  if (userId) {
    console.log(userId)
    redirect("/dashboard");
  }

  return (
    <div className="grid grid-rows-5 place-items-center h-screen px-5 text-center space-y-5 relative">
      <div className="row-span-4">
        <h1 className="text-4xl mb-5 text-heading-color">
          Pozdravljeni na strani Njivičke lore!
        </h1>
        <p className="text-2xl">~ Brez papirja ~</p>
        <p className="text-md mb-10 line-through">In kamenčkov</p>
        <SignedOut>
          <SignInButton>
            <button className="px-6 py-3 text-lg bg-accent-color text-main-color cursor-pointer border-none rounded shadow-md">
              Prijavi se!
            </button>
          </SignInButton>
        </SignedOut>
      </div>
      <Link href={"/showcase"} className="py-1 px-3 border-2 border-accent-color text-md font-bold rounded-xl">
        Poglej kako izgleda
      </Link>
    </div>
  );
}
