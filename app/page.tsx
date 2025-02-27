import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-rows-5 place-items-center h-screen px-5 text-center space-y-5 bg-neutral-light">
      <div className="row-span-4">
        <h1 className="text-5xl mb-5 text-neutral-dark">
          Pozdravljeni na strani<br></br>Njivičke lore!
        </h1>
        <p className="text-2xl text-neutral">~ Brez papirja ~</p>
        <p className="text-md mb-10 line-through text-neutral-dark">In kamenčkov</p>
        <Link 
          href={"/login"} 
          className="px-6 py-3 text-lg bg-primary text-white hover:bg-primary-dark transition-colors rounded-md shadow-lg"
        >
          Prijavi se!
        </Link>
      </div>
      <Link
        href={"/showcase"}
        className="py-2 px-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors text-md font-bold rounded-md"
      >
        Poglej kako izgleda
      </Link>
    </div>
  );
}
