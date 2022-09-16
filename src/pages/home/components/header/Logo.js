import { Link } from "react-router-dom";
import logo from "../../../../assets/PngItem_2740274.png";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" className=" w-10" />
    </Link>
  );
};

export default Logo;
