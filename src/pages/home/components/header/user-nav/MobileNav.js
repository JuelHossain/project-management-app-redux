// import { useEffect, useState } from "react";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../../features/auth/authSelector";
import { userLoggedOut } from "../../../../../features/auth/authSlice";
import { image } from "../../../../../utils/defaults";

const MobileNav = () => {
  const { name } = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLoggedOut());
  };

  return (
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
          src={image(name)}
        />
      </MenuHandler>
      <MenuList className="space-y-1">
        <MenuItem
          className="flex items-center gap-2 bg-blue-500/20 text-blue-500 hover:bg-blue-700/50 hover:text-blue-900"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src={image(name)} alt={name} className="w-5 h-5" />
          {name}
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MobileNav;
