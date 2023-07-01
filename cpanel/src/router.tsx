import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import Authentication from "./Pages/Authentication/Authentication.lazy";
import Home from "./Pages/Home/Home.lazy";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Navigate to="/app" />, index: true },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "authentication",
        element: <Authentication />,
      },
    ],
  },
]);
