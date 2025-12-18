import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import StaffLayout from "../layouts/StaffLayout";

// Public Pages
import Home from "../pages/Home/Home";
import AllIssues from "../pages/AllIssues/AllIssues";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Faq from "../pages/FAQ/Faq";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import NotFound from "../pages/NotFound/NotFound";

// User Dashboard Pages
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import MyIssues from "../pages/UserDashboard/MyIssues";
import ReportIssue from "../pages/UserDashboard/ReportIssue";
import Profile from "../pages/UserDashboard/Profile";

// Admin Dashboard Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageIssues from "../pages/Admin/ManageIssues";
import Users from "../pages/Admin/Users";
import Payments from "../pages/Admin/Payments";
import ManageStaff from "../pages/Admin/ManageStaff";

// Staff Dashboard Pages
import StaffDashboard from "../pages/Staff/StaffDashboard";
import AssignedIssues from "../pages/Staff/AssignedIssues";
import StaffProfile from "../pages/Staff/StaffProfile";

const router = createBrowserRouter([
  /* =========================
     🌐 PUBLIC WEBSITE ROUTES
  ========================== */
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-issues", element: <AllIssues /> },
      { path: "issue/:id", element: <IssueDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "faq", element: <Faq /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  /* =========================
     👤 USER DASHBOARD ROUTES
  ========================== */
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "my-issues", element: <MyIssues /> },
      { path: "report-issue", element: <ReportIssue /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  /* =========================
     🛠️ ADMIN DASHBOARD ROUTES
  ========================== */
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "issues", element: <ManageIssues /> },
      { path: "users", element: <Users /> },
      { path: "staff", element: <ManageStaff /> },
      { path: "payments", element: <Payments /> },
    ],
  },

  /* =========================
     👷 STAFF DASHBOARD ROUTES
  ========================== */
  {
    path: "/staff",
    element: <StaffLayout />,
    children: [
      { index: true, element: <StaffDashboard /> },
      { path: "issues", element: <AssignedIssues /> },
      { path: "profile", element: <StaffProfile /> },
    ],
  },

  /* =========================
     ❌ NOT FOUND
  ========================== */
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
