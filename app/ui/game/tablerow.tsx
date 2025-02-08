import { getRoundInfo } from "@/app/lib/data";
import clsx from "clsx"
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  BriefcaseMedical,
  Gem,
  Crown,
  HeartOff,
  SquareDashed,
  ToyBrick,
} from "lucide-react";


const minigameIcons: Record<string, React.ElementType> = {
  "": SquareDashed,
  max: ArrowUpFromLine,
  min: ArrowDownFromLine,
  srca: HeartOff,
  dame: Gem,
  kralj: Crown,
  prognoza: BriefcaseMedical,
  lora: ToyBrick,
};

export default async function TableRow({ roundID }: { roundID: number }) {
  const round = await getRoundInfo(roundID);
  const IconComponent = minigameIcons[round.mgame] || null;
  return (
    <tr className="border-b-2 text-center border-black">
      <td className="py-2 justify-center">{round.round}.</td>
      <td className={clsx("py-2", { underline: round.master === 0 })}>{round.p1}</td>
      <td className={clsx("py-2", { underline: round.master === 1 })}>{round.p2}</td>
      <td className={clsx("py-2", { underline: round.master === 2 })}>{round.p3}</td>
      <td className={clsx("py-2", { underline: round.master === 3 })}>{round.p4}</td>
      <td className="py-2 flex justify-center"><IconComponent /></td>
    </tr>
  );
}
