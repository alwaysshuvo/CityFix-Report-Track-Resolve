// src/routes/router.jsx

import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home/Home";
import AllIssues from "../pages/AllIssues/AllIssues";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import MyIssues from "../pages/Dashboard/MyIssues";
import ReportIssue from "../pages/Dashboard/ReportIssue";
import Profile from "../pages/Dashboard/Profile";
import Faq from "../pages/FAQ/Faq";
import About from "../pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [

      {
        index: true,
        element: <Home />,
      },

      {
        path: "all-issues",
        element: <AllIssues />,
      },
      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "issue/:id",
        element: <IssueDetails />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "Faq",
        element: <Faq />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

 
  {
    path: "/dashboard",
    element: <DashboardLayout />,

    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "my-issues",
        element: <MyIssues />,
      },
      {
        path: "report-issue",
        element: <ReportIssue />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
