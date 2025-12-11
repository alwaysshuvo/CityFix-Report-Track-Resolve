import Hero from "../../components/Hero/Hero";
import HeroCard from "../../components/HeroCard/HeroCard";
import LatestResolved from "../../components/LatestResolved/LatestResolved";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import ExtraOne from "../../components/Extras/ExtraOne";
import ExtraTwo from "../../components/Extras/ExtraTwo";

const Home = () => {
  return (
    <div className="pt-20 space-y-24">
      <Hero />
      <HeroCard />
      <LatestResolved />
      <Features />
      <HowItWorks />
      <ExtraOne />
      <ExtraTwo />
      
    </div>
  );
};

export default Home;
