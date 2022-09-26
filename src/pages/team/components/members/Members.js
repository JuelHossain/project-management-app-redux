import React from "react";
import ScrollBar from "react-perfect-scrollbar";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../../features/team/teamApi";
import Loading from "../../../components/Loading";
import MemberList from "./MemberList";
const Members = ({ id }) => {
  // getting members
  const {
    data: { members, color, createdBy: { email: createdBy } } = {},
    isLoading: membersLoading,
    error: membersError,
  } = useGetTeamQuery(id);

  // to delete member i need this edit team
  const [editTeam] = useEditTeamMutation();

  const newMembers = (memberId) => {
    return members.filter((existingMember) => existingMember.id !== memberId);
  };

  // dynamic content holder
  let membersContent;

  // decide what to render
  if (members?.length > 0) {
    membersContent = members?.map((member) => {
      const { id: memberId } = member;
      return (
        <MemberList
          key={memberId}
          teamId={id}
          member={member}
          color={color}
          createdBy={createdBy}
          editTeam={editTeam}
          newMembers={newMembers}
        />
      );
    });
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
      <Loading visible={membersLoading} />
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
