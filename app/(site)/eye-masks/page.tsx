import Introduction from "@/containers/pages/eye-masks/introduction";
import Article from "@/containers/pages/eye-masks/article";
import Advantages from "@/containers/pages/eye-masks/advantages";


export default function EyeMasksPage() {
  return (
    <main className={"overflow-x-hidden"}>
      <Introduction/>
      <Article/>
      <Advantages/>
    </main>
  );
}