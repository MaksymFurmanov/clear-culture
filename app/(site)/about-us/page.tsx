import AchievementsGallery from "@/containers/site-pages/about-us/achievements-gallery";
import BrandHistory from "@/containers/site-pages/about-us/brand-history";
import AboutTeam from "@/containers/site-pages/about-us/about-team";

export default function AboutUsPage() {
  return (
    <main className={"md:text-lg lg:text-2xl"}>
      <h1 className={"text-2xl text-center my-8 md:my-10 lg:my-12 md:text-3xl lg:text-4xl"}>
        What is Clear Culture?
      </h1>
      <AchievementsGallery />
      <BrandHistory />
      <AboutTeam />
    </main>
  );
}