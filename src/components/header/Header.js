import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const match = useMatch("/projects");
  const navLink = [
    {
      name: "Teams",
      link: "/",
    },
    {
      name: "Projects",
      link: "/projects",
    },
  ];
  const { pathname } = useLocation();
  const navList = (
    <>
      {navLink.map((link) => (
        <Link
          className={link.link === pathname ? "text-blue-600" : ""}
          to={link.link}
        >
          {link.name}
        </Link>
      ))}
    </>
  );

  return (
    <div class="flex items-center flex-shrink-0 w-full h-16 px-10 bg-light-blue-500/20 justify-between">
      <div className="flex gap-8 items-center">
        <p className="text-xl font-bold "> Pro Man</p>
        <div class="flex gap-2">{navList}</div>
      </div>
      <div className="flex gap-4 items-center">
        {match && (
          <input
            class="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 text-light-blue-900 rounded-full focus:outline-none focus:ring placeholder:text-blue-900/50"
            type="search"
            placeholder="Search for projects..."
          />
        )}
        <button class="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
          <img
            src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
