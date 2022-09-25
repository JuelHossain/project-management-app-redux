import { ShieldCheckIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import ScrollBar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../features/team/teamApi";
import Loading from "../../components/Loading";
const Members = ({ id }) => {
  const myEmail = useSelector((state) => state.auth.user.email);
  const {
    data: { members, color, createdBy: { email: createdBy } } = {},
    isLoading: membersLoading,
    error: membersError,
  } = useGetTeamQuery(id);

  const [editTeam] = useEditTeamMutation();

  let membersContent;

  if (members?.length > 0) {
    membersContent = members?.map((member) => (
      <li
        className={`py-1 px-3 rounded-md flex justify-between gap-3 items-center `}
        style={color?.common}
        key={member.id}
      >
        <Loading visible={membersLoading} />
        <p> {member.email === myEmail ? "You" : member.name}</p>
        {createdBy === myEmail && myEmail !== member.email ? (
          <IconButton
            className={`-mr-2 w-5 h-5`}
            style={{ backgroundColor: color?.["200"], color: color?.["600"] }}
            onClick={() => {
              const newMembers = members.filter(
                (existingMember) => existingMember.id !== member.id
              );
              editTeam({ id, data: { members: newMembers } });
            }}
          >
            <TrashIcon className="w-3.5 h-3.5" />
          </IconButton>
        ) : createdBy === member.email ? (
          <IconButton
            className={`-mr-2  w-5 h-5 `}
            style={{ backgroundColor: color?.["300"], color: color?.["700"] }}
          >
            <ShieldCheckIcon className="w-4 h-4" />
          </IconButton>
        ) : (
          <IconButton
            className={`-mr-2 w-5 h-5 `}
            style={{ backgroundColor: color?.["300"], color: color?.["700"] }}
          >
            <UserCircleIcon className="w-4 h-4"/>
          </IconButton>
        )}
      </li>
    ));
  } else if (membersError) {
    membersContent = (
      <p className="text-red-500 text-xs py-1 px-3 bg-red-100 rounded-md mt-1">
        {"There was some error getting members"}
      </p>
    );
  } else {
    <p className="text-red-500 text-xs py-1 px-3 bg-red-100 rounded-md mt-1">
      {"There is no member found"}
    </p>;
  }
  return (
    <ul className="flex gap-1 flex-col flex-shrink-0 ">
      <div className="flex gap-0.5  py-1 ">
        <p>Members</p>
        <p className={`py-0.5 px-1.5 rounded-md text-xs `} style={color.common}>
          {members?.length}
        </p>
      </div>
      <ScrollBar className=" space-y-1 max-h-[125px] overflow-auto pr-2 ">
        {membersContent}
      </ScrollBar>
    </ul>
  );
};

export default Members;
