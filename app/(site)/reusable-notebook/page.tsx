import Introduction from "@/app/(site)/reusable-notebook/introduction";
import Advantages from "@/app/(site)/reusable-notebook/advantages";
import Article from "@/app/(site)/reusable-notebook/article";
import IntegratesWith from "@/app/(site)/reusable-notebook/integrates-with";
import DopeProblemArticle from "@/app/(site)/reusable-notebook/dope-problem-article";

export default function NotebookPage() {

  return (
    <main className={"mx-auto md:text-lg lg:text-2xl md:w-3/5"}>
      <div className={"md:flex justify-around items-center"}>
        <Introduction />
        <Advantages />
      </div>
      <Article />
      <IntegratesWith />
      <DopeProblemArticle />
    </main>
  );
}