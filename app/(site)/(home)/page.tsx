import HeroSection from "../../../containers/site-pages/home/hero-section";
import CertificatesGallery from "../../../containers/site-pages/home/certificates-gallery";
import ReviewsGallery from "../../../containers/site-pages/home/reviews-gallery";
import BrandAdvantages from "../../../containers/site-pages/home/brand-advantages";
import ProductsPreviews from "../../../containers/site-pages/home/products-previews";
import RunningNumbers from "../../../containers/site-pages/home/running-numbers";

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
