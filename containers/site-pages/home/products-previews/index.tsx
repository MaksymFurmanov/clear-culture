import NotebookArticlePreview from "@/containers/site-pages/home/products-previews/notebook-article-preview";
import EyeMasksArticlePreview from "@/containers/site-pages/home/products-previews/eye-masks-article-preview";

export default function ProductsPreviews() {
  return (
    <section>
      <EyeMasksArticlePreview/>
      <NotebookArticlePreview/>
    </section>
  );
}