import { Avatar, Chip } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { image } from "../../utils/defaults";

const Profile = () => {
  const { name, email, admin } = useSelector((state) => state.auth.user);
  return (
    <div className=" space-y-2 w-full mx-auto px-5 sm:px-10 py-5 bg-white/80 rounded-lg relative flex-grow">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        <Avatar
          variant="circular"
          size="xxl"
          className="p-2 ring-4 0"
          src={image(name)}
          alt="user"
        />
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-3xl font-bold px-2">{name}</p>
          <p className="text-2xl font-bold ring-2 rounded px-2 py-0.5s">
            {email}
          </p>
        </div>
      </div>
      <Chip
        value={!!admin ? "Admin" : "User"}
        className="absolute top-1 right-3  sm:top-6 sm:right-10"
      />
    </div>
  );
};

export default Profile;
