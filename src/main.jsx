import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import AuthProvider from "./provider/AuthProvider";
import { ThemeProvider } from "./provider/ThemeContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>        
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
