import ShowcaseBody from "../ui/showcase/showcase-body";
import ShowcaseInfo from "../ui/showcase/showcase-info";

export default async function Page() {
  return (
    <div className="px-2">
      <ShowcaseInfo />
      <ShowcaseBody />
    </div>
  );
}
