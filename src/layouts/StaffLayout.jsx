import { useState } from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../components/StaffDashboard/StaffSidebar";
import StaffNavbar from "../components/StaffDashboard/StaffNavbar";


const StaffLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-base-100">
      <StaffSidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <StaffNavbar setOpen={setOpen} />
        <main className="p-4 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
