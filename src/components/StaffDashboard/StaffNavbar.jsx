import { Link } from "react-router-dom";

const StaffNavbar = ({ setOpen }) => {
  return (
    <div className="h-16 bg-base-100 border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden btn btn-ghost btn-sm"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
        <span className="text-xl font-bold text-primary">
          Staff Panel
        </span>
      </div>

      <Link to="/" className="text-sm font-medium hover:text-primary">
        Go to Website
      </Link>
    </div>
  );
};

export default StaffNavbar;
