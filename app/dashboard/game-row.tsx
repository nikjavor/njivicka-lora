import Link from "next/link";

export default function GameRow({
  id,
  title,
  creation_date,
}: {
  id: number;
  title: string;
  creation_date: string;
}) {
  return (
    <Link href={`/game/?g=${id}`}>
      <div className="grid grid-cols-5 border-b border-neutral p-3 hover:bg-neutral-light transition rounded-md cursor-pointer">
        <p className="border-r border-neutral-dark text-center text-neutral-dark">{id}</p>
        <p className="col-span-2 border-r border-neutral-dark text-center text-primary font-medium">{title}</p>
        <p className="col-span-2 text-center text-gray-500">
          {new Date(creation_date).toLocaleDateString("en-GB")}
        </p>
      </div>
    </Link>
  );
}

