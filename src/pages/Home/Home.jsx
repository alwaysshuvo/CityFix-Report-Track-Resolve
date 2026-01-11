import { useContext } from "react";
import Hero from "../../components/Hero/Hero";
import HeroCard from "../../components/HeroCard/HeroCard";
import LatestResolved from "../../components/LatestResolved/LatestResolved";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import ExtraOne from "../../components/Extras/ExtraOne";
import ExtraTwo from "../../components/Extras/ExtraTwo";
import { ThemeContext } from "../../provider/ThemeContext";
import Statistics from "../../components/Extras/Statistics";
import Testimonials from "../../components/Extras/Testimonials";
import Newsletter from "../../components/Extras/Newsletter";

const Home = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`
        pt-20 space-y-24 min-h-screen transition-all duration-300
        ${dark ? "bg-black text-white" : "bg-gray-50 text-black"}
      `}
    >
      <Hero />
      <HeroCard />
      <LatestResolved />
      <Features />
      <HowItWorks />
      <ExtraOne />
      <Statistics />
      <Testimonials />
      <Newsletter />
      <ExtraTwo />
      
    </div>
  );
};

export default Home;
