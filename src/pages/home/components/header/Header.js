// import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import Logo from "./Logo";
import NavList from "./NavList";
import Search from "./Search";
import UserNav from "./user-nav/UserNav";

export default function Header() {
  const match = useMatch("/projects");
  return (
    <div
      className={`flex items-center flex-shrink-0 w-full py-3 px-5 sm:px-10 bg-gradient-to-tl from-blue-200/50 via-indigo-200/50 to-pink-200/50 justify-between ${
        match && "flex-col gap-2 md:flex-row"
      } `}
    >
      <div className=" justify-between flex gap-2 w-full">
        <div className="flex gap-2 items-center">
          <Logo />
          <NavList />
        </div>
        <div className="flex gap-2 items-center">
          <Search match={match} cls={"hidden sm:flex"} />
          <UserNav />
        </div>
      </div>
      <Search match={match} cls={"sm:hidden"} />
    </div>
  );
}
