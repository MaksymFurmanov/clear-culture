import Introduction from "@/src/features/marketing/eye-masks/ui/Introduction";
import Article from "@/src/features/marketing/eye-masks/ui/Article";
import Advantages from "@/src/features/marketing/eye-masks/ui/Advantages";

export default function EyeMasksPage() {
  return (
    <main className={"overflow-x-hidden"}>
      <Introduction/>
      <Article/>
      <Advantages/>
    </main>
  );
}