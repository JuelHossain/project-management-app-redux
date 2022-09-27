import {
  ShieldCheckIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { selectUser } from "../../../../../features/auth/authSelector";
import { useEditTeamMutation } from "../../../../../features/team/teamApi";
import { getNewMembers } from "../../../../../utils/lib";

export default function MemberList({
  color,
  member,
  createdBy,
  members,
  teamId,
}) {
  // logged in user
  const { email: myEmail } = useSelector(selectUser);

  // destructured property of member
  const { id: memberId, name: memberName, email: memberEmail } = member;

  // to delete member i need this edit team
  const [editTeam] = useEditTeamMutation();

  // handling delete member
  const deleteMember = () => {
    editTeam({
      id: teamId,
      data: {
        members: getNewMembers(members, memberId),
      },
    });
  };

  return (
    <li
      className={`py-1 px-3 rounded-md flex justify-between gap-3 items-center `}
      style={color?.common}
    >
      <p> {memberEmail === myEmail ? "You" : memberName}</p>
      <IconButton
        className={`-mr-2  w-5 h-5 `}
        style={{
          backgroundColor: color?.["300"],
          color: color?.["700"],
        }}
      >
        {createdBy === myEmail && myEmail !== memberEmail ? (
          <TrashIcon className="w-3.5 h-3.5" onClick={deleteMember} />
        ) : createdBy === memberEmail ? (
          <ShieldCheckIcon className="w-4 h-4" />
        ) : (
          <UserCircleIcon className="w-4 h-4" />
        )}
      </IconButton>
    </li>
  );
}
