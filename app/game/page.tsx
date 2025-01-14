function GameInfo() {
  return (
    <>
      <h1 className="text-4xl text-center">Game Name</h1>
      <table className="border-2 w-full">
        <tbody className="border-2 border-red-500">
          <tr className="border-2 border-green-500 *:text-center">
            <td className="border-2 border-blue-500">player1</td>
            <td>player2</td>
            <td>player3</td>
            <td>player4</td>
          </tr>
        </tbody>
      </table>
      <p className="text-center">2.12.2005</p>
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
