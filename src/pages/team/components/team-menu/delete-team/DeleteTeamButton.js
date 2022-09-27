import { TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, PopoverHandler } from "@material-tailwind/react";
import React from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../../../../features/auth/authSelector";
import { useGetTeamQuery } from "../../../../../features/team/teamApi";

export default function DeleteTeamButton({ id }) {
  // logged in user
  const { email: myEmail } = useSelector(selectUser);

  // getting team data
  const { data: { color, createdBy: { email: createdBy } = {} } = {} } =
    useGetTeamQuery(id);
  return (
    <PopoverHandler>
      <IconButton
        disabled={createdBy !== myEmail}
        style={{
          backgroundColor: color?.["200"],
          color: color?.["600"],
        }}
        className={`w-6 h-6  `}
      >
        <TrashIcon className="w-4 h-4" />
      </IconButton>
    </PopoverHandler>
  );
}
