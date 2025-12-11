
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import AllIssues from "../pages/AllIssues/AllIssues";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Faq from "../pages/FAQ/Faq";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import UserDashboard from "../pages/Dashboard/UserDashboard";
import MyIssues from "../pages/Dashboard/MyIssues";
import ReportIssue from "../pages/Dashboard/ReportIssue";
import Profile from "../pages/Dashboard/Profile";

import NotFound from "../pages/NotFound/NotFound";
import IssueCard from "../pages/IssueCard/IssueCard";

const router = createBrowserRouter([

  // Public Website Routes

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
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "issue/:id",
        element: <IssueCard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },


  // Dashboard Routes
 
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
// 404 Page Error
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
