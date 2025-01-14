function GameInfo() {
  return (
    <>
      <h1 className="text-4xl text-center">Game Name</h1>
      <p className="text-center">2.12.2005</p>
      <table className="w-full">
        <tbody className="border-red-500">
          <tr className="border-green-500 *:text-center *:text-xs">
            <td>p1:leonabr</td>
            <td>p2:nikjavo</td>
            <td>p3:najajav</td>
            <td>p4:crtstro</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function Page() {
  return (
    <>
      <GameInfo />
    </>
  );
}
