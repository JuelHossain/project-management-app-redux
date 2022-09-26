import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { selectUser } from "../../../../../features/auth/authSelector";
import { userLoggedOut } from "../../../../../features/auth/authSlice";
import { image } from "../../../../../utils/defaults";

const Nav = () => {
  const { name } = useSelector(selectUser);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLoggedOut());
  };
  const navigate = useNavigate();
  const match = useMatch("/dashboard");
  return (
    <div className=" items-center gap-2 flex-shrink-0 hidden md:flex">
      <Button
        size="sm"
        variant={match ? "filled" : "outlined"}
        className="flex items-center gap-2"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <Avatar
          className="hidden sm:flex w-4 h-4"
          size="sm"
          variant="circular"
          src={image(name)}
        />
        {name}
      </Button>
      <IconButton
        size="sm"
        variant={match ? "filled" : "outlined"}
        onClick={logout}
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
      </IconButton>
    </div>
  );
};

export default Nav;
