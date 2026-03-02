import Introduction from "@/src/features/marketing/eye-masks/ui/Introduction";
import Advantages from "@/src/features/marketing/eye-masks/ui/Advantages";
import Article from "@/src/features/marketing/eye-masks/ui/Article";
import IntegratesWith from "@/src/features/marketing/reusable-notebook/ui/IntegratesWith";
import DopeProblemArticle from "@/src/features/marketing/reusable-notebook/ui/DopeProblemArticle";

export default function NotebookPage() {
  return (
    <main className={"text-base md:text-lg lg:text-2xl"}>
      <div className={"md:flex justify-around items-center max-w-200 mx-auto"}>
        <Introduction />
        <Advantages />
      </div>
      <div className={"max-w-150 mx-auto"}>
        <Article />
        <IntegratesWith />
        <DopeProblemArticle />
      </div>
    </main>
  );
}