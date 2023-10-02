import LandingBottom from "@/components/landing-bottom";
import { LandingPricelist } from "@/components/landing-pricelist";
import { LandingHero } from "@/components/landing-hero";
import LandingNavbar from "@/components/landing-navbar";
import { LandingFeatures } from "@/components/landing-features";
import { LandingUsecases } from "@/components/landing-usecase";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingUsecases />
      <LandingPricelist />
      <LandingBottom />
    </div>
  );
};

export default LandingPage;
