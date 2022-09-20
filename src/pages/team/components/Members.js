import { IconButton } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../features/team/teamApi";
import Loading from "../../components/Loading";
const Members = ({ id }) => {
  const myEmail = useSelector((state) => state.auth.user.email);
  const {
    data: { members, color, createdBy } = {},
    isLoading: membersLoading,
    error: membersError,
  } = useGetTeamQuery(id);

  const [editTeam] = useEditTeamMutation();

  let membersContent;

  if (members?.length > 0) {
    membersContent = members?.map((member) => (
      <li
        className={`py-1 px-3 rounded-md flex justify-between gap-3 items-center `}
        style={color}
        key={member.id}
      >
        <Loading visible={membersLoading} />
        <p> {member.email === myEmail ? "You" : member.name}</p>
        {createdBy === myEmail && myEmail !== member.email ? (
          <IconButton
            className={`-mr-2 w-5 h-5`}
            style={color}
            onClick={() => {
              const newMembers = members.filter(
                (existingMember) => existingMember.id !== member.id
              );
              editTeam({ id, data: { members: newMembers } });
            }}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </IconButton>
        ) : createdBy === member.email ? (
          <IconButton className={`-mr-2  w-5 h-5 `} style={color}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </IconButton>
        ) : (
          <IconButton className={`-mr-2 w-5 h-5 `} style={color}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
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
        <p className={`py-0.5 px-1.5 rounded-md text-xs `} style={color}>
          {members?.length}
        </p>
      </div>
      <div className=" space-y-1 max-h-[125px] overflow-auto pr-2 ">
        {membersContent}
      </div>
    </ul>
  );
};

export default Members;
