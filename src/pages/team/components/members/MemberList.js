import {
  ShieldCheckIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelector";

export default function MemberList({
  color,
  member,
  createdBy,
  editTeam,
  newMembers,
  teamId,
}) {
  const { email: myEmail } = useSelector(selectUser);
  const { id: memberId, name: memberName, email: memberEmail } = member;

  return (
    <li
      className={`py-1 px-3 rounded-md flex justify-between gap-3 items-center `}
      style={color?.common}
    >
      <p> {memberEmail === myEmail ? "You" : memberName}</p>
      {createdBy === myEmail && myEmail !== memberEmail ? (
        <IconButton
          className={`-mr-2 w-5 h-5`}
          style={{
            backgroundColor: color?.["200"],
            color: color?.["600"],
          }}
          onClick={() => {
            editTeam({
              id: teamId,
              data: {
                members: newMembers(memberId),
              },
            });
          }}
        >
          <TrashIcon className="w-3.5 h-3.5" />
        </IconButton>
      ) : createdBy === memberEmail ? (
        <IconButton
          className={`-mr-2  w-5 h-5 `}
          style={{
            backgroundColor: color?.["300"],
            color: color?.["700"],
          }}
        >
          <ShieldCheckIcon className="w-4 h-4" />
        </IconButton>
      ) : (
        <IconButton
          className={`-mr-2 w-5 h-5 `}
          style={{
            backgroundColor: color?.["300"],
            color: color?.["700"],
          }}
        >
          <UserCircleIcon className="w-4 h-4" />
        </IconButton>
      )}
    </li>
  );
}
