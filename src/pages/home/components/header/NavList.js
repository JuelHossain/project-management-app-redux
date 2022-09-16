import { Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

const NavList = () => {
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
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      {navLink.map((link) => (
        <Button
          onClick={() => {
            navigate(link?.link);
          }}
          key={Math.random()}
          size="sm"
          variant={link.link === pathname ? "filled" : "outlined"}
        >
          {link.name}
        </Button>
      ))}
    </div>
  );
};

export default NavList;
