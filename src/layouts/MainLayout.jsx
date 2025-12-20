import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CityFixLoader from "../components/loader/CityFixLoader";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeContext";

const MainLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div
      className={`
        min-h-screen transition-colors duration-300
        ${dark ? "bg-[#0B0B0B] text-gray-200" : "bg-gray-50 text-black"}
      `}
    >
      <ScrollToTop />
      <Navbar />
      <div className="pt-20">
        {isLoading ? <CityFixLoader /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
