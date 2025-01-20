import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Lora score</h1>
      <Link href={"/game?g=1"} className="p-3 bg-black text-white text-3xl font-bold rounded-xl">Play game</Link>
    </div>
  );
}
