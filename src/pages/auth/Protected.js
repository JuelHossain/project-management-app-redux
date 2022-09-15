import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  if (true) {
    return children;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default Protected;
