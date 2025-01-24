"use client";

import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  BriefcaseMedical,
  CookingPot,
  Crown,
  HeartOff,
  Puzzle,
  SquareDashed,
  ToyBrick,
  X,
} from "lucide-react";

export default function ShowcaseBody() {
  return (
    <>
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b-4 border-black border-double">
            <th className="mb-6">Nº</th>
            <th className="text-center">p1</th>
            <th className="text-center">p2</th>
            <th className="text-center">p3</th>
            <th className="text-center">p4</th>
            <th className="flex justify-center">
              <Puzzle />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 text-center border-black">
            <td className="py-2 justify-center">1.</td>
            <td className="py-2 underline">-4</td>
            <td className="py-2">0</td>
            <td className="py-2">0</td>
            <td className="py-2">-4</td>
            <td className="py-2 flex justify-center">
              <ArrowUpFromLine />
            </td>
          </tr>
          <tr className="border-b-2 text-center border-black mb-4">
            <td className="py-2 justify-center">2.</td>
            <td className="py-2">-2</td>
            <td className="py-2 underline">3</td>
            <td className="py-2">1</td>
            <td className="py-2">-2</td>
            <td className="py-2 flex justify-center">
              <ArrowDownFromLine />
            </td>
          </tr>
          <tr className="border-b-2 text-center border-black mb-4">
            <td className="py-2 justify-center">3.</td>
            <td className="py-2">-10</td>
            <td className="py-2">3</td>
            <td className="py-2 underline">1</td>
            <td className="py-2">-2</td>
            <td className="py-2 flex justify-center">
              <HeartOff />
            </td>
          </tr>
          <tr className="border-b-2 text-center border-black mb-4">
            <td className="py-2 justify-center">4.</td>
            <td className="py-2">-6</td>
            <td className="py-2">5</td>
            <td className="py-2">1</td>
            <td className="py-2 underline">0</td>
            <td className="py-2 flex justify-center">
              <CookingPot />
            </td>
          </tr>
          <tr className="border-b-2 text-center border-black mb-4">
            <td className="py-2 justify-center">5.</td>
            <td className="py-2 underline">-6</td>
            <td className="py-2">9</td>
            <td className="py-2">1</td>
            <td className="py-2">4</td>
            <td className="py-2 flex justify-center">
              <Crown />
            </td>
          </tr>
          <tr className="border-b-2 text-center border-black mb-4">
            <td className="py-2 justify-center">6.</td>
            <td className="py-2">-3</td>
            <td className="py-2 underline">12</td>
            <td className="py-2">4</td>
            <td className="py-2">1</td>
            <td className="py-2 flex justify-center">
              <BriefcaseMedical />
            </td>
          </tr>
          <tr className="border-b-2 text-center border-black mb-4">
            <td className="py-2 justify-center">7.</td>
            <td className="py-2">-3</td>
            <td className="py-2">14</td>
            <td className="py-2 underline">6</td>
            <td className="py-2">3</td>
            <td className="py-2 flex justify-center">
              <ToyBrick />
            </td>
          </tr>
          <tr className="border-b-2 text-center border-black mb-4">
            <td className="py-2 flex justify-center">
              <X
                color="red"
                className="cursor-pointer"
                onClick={() => {
                  confirm("Res želiš izbrisati ta krog?");
                }}
              />
              &nbsp;
            </td>
            <td className="py-2">.</td>
            <td className="py-2">.</td>
            <td className="py-2">.</td>
            <td className="py-2">_</td>
            <td className="py-2 flex justify-center">
            <SquareDashed />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <p className="bg-black text-white  text-lg font-bold text-center rounded-full py-2.5 col-span-2 cursor-pointer">
          Add Next
        </p>
        <p
          className="bg-black text-white  text-lg font-bold text-center rounded-full py-2.5 cursor-pointer"
          onClick={() => {
            alert("Succesfully saved resoults to database. kao");
          }}
        >
          Save
        </p>
      </div>
    </>
  );
}
