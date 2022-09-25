import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useMatch, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../../features/auth/authSlice";
import { image } from "../../../../utils/defaults";

const UserNav = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLoggedOut());
  };
  const navigate = useNavigate();
  const match = useMatch("/dashboard");
  return (
    <>
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
            src={image(user?.name)}
          />
          {user?.name}
        </Button>
        <IconButton
          size="sm"
          variant={match ? "filled" : "outlined"}
          onClick={logout}
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
        </IconButton>
      </div>
      <Menu
        placement="bottom-end"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <Avatar
            className="md:hidden"
            size="sm"
            variant="circular"
            src={image(user?.name)}
          />
        </MenuHandler>
        <MenuList className="space-y-1">
          <MenuItem
            className="flex items-center gap-2 bg-blue-500/20 text-blue-500 hover:bg-blue-700/50 hover:text-blue-900"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <img src={image(user?.name)} alt={user?.name} className="w-5 h-5" />
            {user?.name}
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserNav;
