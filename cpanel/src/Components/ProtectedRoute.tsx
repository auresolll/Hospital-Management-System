import { Navigate, useLocation } from "react-router-dom";
import { ERouter } from "../Constants/Enums/router";
import { AuthenticationService } from "../Services/authentication/authentication";

interface IProtectedRoute {
  children: JSX.Element;
}
export const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const access_token = AuthenticationService.getInstance().getAccessToken();
  const location = useLocation();

  if (!access_token) {
    return (
      <Navigate to={`/${ERouter.signIn}`} replace state={{ from: location }} />
    );
  }

  return children;
};
