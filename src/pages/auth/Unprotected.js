import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Unprotected = ({ children }) => {
  const loggedIn = useAuth();
  const location = useLocation();
  if (loggedIn) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default Unprotected;
