import Introduction from "@/containers/site-pages/eye-masks/introduction";
import Article from "@/containers/site-pages/eye-masks/article";
import Advantages from "@/containers/site-pages/eye-masks/advantages";

export default function EyeMasksPage() {
  return (
    <main className={"overflow-x-hidden"}>
      <Introduction/>
      <Article/>
      <Advantages/>
    </main>
  );
}