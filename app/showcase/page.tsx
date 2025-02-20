import ShowcaseBody from "./showcase-body";
import ShowcaseInfo from "./showcase-info";

export default async function Page() {
  return (
    <div className="px-2">
      <ShowcaseInfo />
      <ShowcaseBody />
    </div>
  );
}
