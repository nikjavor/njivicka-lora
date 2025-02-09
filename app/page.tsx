import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20">
      <h1 className="text-4xl">Lora score</h1>
      <Link
        href={"/game?g=1"}
        className="p-3 bg-black border border-white text-white text-3xl font-bold rounded-xl"
      >
        Play game
      </Link>
      <Link
        href={"/game-showcase?g=1"}
        className="py-1 px-3 bg-black border border-white text-white text-md font-bold rounded-xl"
      >
        See showcase
      </Link>
      <SignedIn>
        <UserButton className="py-1 px-3" />
      </SignedIn>
      <SignedOut>
        <SignInButton className="py-1 px-3 bg-black border border-white text-white text-md font-bold rounded-xl" />
      </SignedOut>
    </div>
  );
}
