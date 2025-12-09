import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CityFixLoader from "../components/loader/CityFixLoader";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); 

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      <Navbar />

      {isLoading ? <CityFixLoader /> : <Outlet />}

      <Footer />
    </div>
  );
};

export default MainLayout;
