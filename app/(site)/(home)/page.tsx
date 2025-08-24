import HeroSection from "@/containers/pages/home/hero-section";
import CertificatesGallery from "@/containers/pages/home/certificates-gallery";
import ReviewsGallery from "@/containers/pages/home/reviews-gallery";
import BrandAdvantages from "@/containers/pages/home/brand-advantages";
import ProductsPreviews from "@/containers/pages/home/products-previews";
import RunningNumbers from "@/containers/pages/home/running-numbers";

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
