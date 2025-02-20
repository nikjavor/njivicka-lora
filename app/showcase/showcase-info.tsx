export default function ShowcaseInfo() {
  const today = new Date();
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center text-heading-color">Showcase Igra</h1>
      <p className="text-center mt-1 mb-2.5 text-heading-color">
        {today.toUTCString().slice(5, 16)}
      </p>
      <div className="grid grid-cols-2 gap-x-6 w-fit mb-4">
        <p>p1: john</p>
        <p>p3: bob</p>
        <p>p2: alice</p>
        <p>p4: mike</p>
      </div>
    </div>
  );
}
