import HeroSection from "@/app/(site)/(home)/hero-section";
import NotebookArticlePreview from "@/app/(site)/(home)/notebook-article-preview";
import EyeMasksArticlePreview from "@/app/(site)/(home)/eye-masks-article-preview";
import RunningQuote from "@/app/(site)/(home)/running-quote";
import AdvantagesBubbles from "@/app/(site)/(home)/advantages-bubbles";
import CertificatesGallery from "@/app/(site)/(home)/certificates-gallery";
import RunningNumbers from "@/app/(site)/(home)/running-numbers";
import ReviewsGallery from "@/app/(site)/(home)/reviews-gallery";
import CatalogButton from "@/app/(site)/(home)/catalog-button";
import BrandPageButton from "@/app/(site)/(home)/brand-page-button";

export default async function HomePage() {
  return (
    <main>
      <HeroSection />
      <AdvantagesBubbles />
      <RunningQuote />
      <NotebookArticlePreview />
      <EyeMasksArticlePreview />
      <CertificatesGallery />
      <RunningNumbers />
      <BrandPageButton/>
      <ReviewsGallery />
      <CatalogButton />
    </main>
  );
}
