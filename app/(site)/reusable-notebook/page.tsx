import Introduction from "@/app/(site)/reusable-notebook/introduction";
import Advantages from "@/app/(site)/reusable-notebook/advantages";
import Article from "@/app/(site)/reusable-notebook/article";
import IntegratesWith from "@/app/(site)/reusable-notebook/integrates-with";
import DopeProblemArticle from "@/app/(site)/reusable-notebook/dope-problem-article";

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