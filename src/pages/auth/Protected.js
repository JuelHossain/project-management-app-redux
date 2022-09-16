import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const location = useLocation();
  if (accessToken) {
    return children;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default Protected;
