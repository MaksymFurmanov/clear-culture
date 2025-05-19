import Introduction from "@/app/(site)/eye-masks/introduction";
import Article from "@/app/(site)/eye-masks/article";
import Advantages from "@/app/(site)/eye-masks/advantages";


export default function EyeMasksPage() {
  return (
    <main className={"overflow-x-hidden"}>
      <Introduction/>
      <Article/>
      <Advantages/>
    </main>
  );
}