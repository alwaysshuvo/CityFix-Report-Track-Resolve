import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public pages
import Home from "../pages/Home/Home";
import AllIssues from "../pages/AllIssues/AllIssues";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Faq from "../pages/FAQ/Faq";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import NotFound from "../pages/NotFound/NotFound";

// User Dashboard pages
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import MyIssues from "../pages/UserDashboard/MyIssues";
import ReportIssue from "../pages/UserDashboard/ReportIssue";
import Profile from "../pages/UserDashboard/Profile";

// Admin pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageIssues from "../pages/Admin/ManageIssues";
import Users from "../pages/Admin/Users";
import Payments from "../pages/Admin/Payments";

const router = createBrowserRouter([
  // 🌐 Public Website Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-issues", element: <AllIssues /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "faq", element: <Faq /> },
      { path: "issue/:id", element: <IssueDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // 👤 User Dashboard Routes
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

  // 🛠️ Admin Dashboard Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "issues", element: <ManageIssues /> },
      { path: "users", element: <Users /> },
      { path: "payments", element: <Payments /> },
    ],
  },

  // ❌ 404
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
