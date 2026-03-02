import HeroSection from "@/src/features/marketing/home/hero-section/ui/HeroSection";
import BrandAdvantages from "@/src/features/marketing/home/brand-advantages/ui/BrandAdvantages";
import ProductsPreviews from "@/src/features/marketing/home/products-previews/ui/ProductPreviews";
import RunningNumbers from "@/src/features/marketing/home/running-numbers/ui/RunningNumbers";
import ReviewsGallery from "@/src/features/marketing/home/reviews-gallery/ui/ReviewsGallery";
import CertificatesGallery from "@/src/features/marketing/home/certificates-gallery/ui/CertificatesGallery";

export default async function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandAdvantages />
      <ProductsPreviews />
      <CertificatesGallery />
      <RunningNumbers />
      <ReviewsGallery />
    </main>
  );
}
