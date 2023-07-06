import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { Layout } from "./Components/Layout/Layout";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { ERouter } from "./Constants/Enums/router";
import Authentication from "./Pages/Authentication/Authentication.lazy";
import Home from "./Pages/Home/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Navigate to={`/${ERouter.app}`} />, index: true },
      {
        path: `${ERouter.app}`,
        element: (
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: `${ERouter.appointment}`,
        element: (
          <ProtectedRoute>
            <Layout>
              <Authentication />
            </Layout>
          </ProtectedRoute>
        ),
        children: [],
      },
    ],
  },
  {
    path: `/${ERouter.signIn}`,
    element: <Authentication />,
  },
]);
