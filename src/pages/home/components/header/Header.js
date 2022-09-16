// import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import Loading from "../../../components/Loading";
import Logo from "./Logo";
import NavList from "./NavList";
import Search from "./Search";
import UserNav from "./UserNav";

export default function Header() {
  const match = useMatch("/projects");
  return (
    <div
      className={`flex items-center flex-shrink-0 w-full py-3 px-5 sm:px-10 bg-gradient-to-tl from-blue-200/50 via-indigo-200/50 to-pink-200/50 justify-between ${
        match && "flex-col gap-2 md:flex-row"
      } `}
    >
      <div className="flex gap-2 items-center">
        <Logo />
        <NavList />
      </div>
      <div className="flex gap-2 items-center ">
        <Search match={match} />
        <UserNav />
      </div>
    </div>
  );
}
