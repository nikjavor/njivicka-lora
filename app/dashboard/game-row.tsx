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
      <div className="grid grid-cols-5 border-2 rounded-md my-0.5 p-1 *:text-center">
        <p className="text-gray-400 border-r-2">{id}</p>
        <p className="text-gray-400 col-span-2 border-r-2">{title}</p>
        <p className="text-gray-400 col-span-2">
          {new Date(creation_date).toLocaleDateString("en-GB")}
        </p>
      </div>
    </Link>
  );
}
