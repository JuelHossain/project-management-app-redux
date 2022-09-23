import { Link } from "react-router-dom";
import logo from "../../../../assets/PngItem_2740274.png";

const Logo = () => {
  return (
    <Link to="/" className="w-10 h-10">
      <img src={logo} alt="logo" className="w-full h-full" />
    </Link>
  );
};

export default Logo;
