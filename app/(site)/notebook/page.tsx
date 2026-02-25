import Introduction from "@/containers/site-pages/reusable-notebook/introduction";
import Advantages from "@/containers/site-pages/reusable-notebook/advantages";
import Article from "@/containers/site-pages/reusable-notebook/article";
import IntegratesWith from "@/containers/site-pages/reusable-notebook/integrates-with";
import DopeProblemArticle from "@/containers/site-pages/reusable-notebook/dope-problem-article";

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