import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../../../features/auth/authSlice";
import { image } from "../../../../utils/defaults";

const UserNav = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLoggedOut());
  };
  return (
    <>
      <div className=" items-center gap-2 flex-shrink-0 hidden sm:flex">
        <Button
          size="sm"
          variant="outlined"
          className="flex items-center gap-2"
          as={Link}
          to="/dashboard"
        >
          <Avatar
            className="hidden sm:flex w-4 h-4"
            size="sm"
            variant="circular"
            src={image(user?.name)}
          />
          {user?.name}
        </Button>
        <IconButton size="sm" variant="outlined" onClick={logout}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
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
            className="sm:hidden"
            size="sm"
            variant="circular"
            src={image(user?.name)}
          />
        </MenuHandler>
        <MenuList className="space-y-1">
          <MenuItem
            className="flex items-center gap-2 bg-blue-500/20 text-blue-500 hover:bg-blue-700/50 hover:text-blue-900"
            to="/dashboard"
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
