import React from "react";
import ScrollBar from "react-perfect-scrollbar";
import { useGetTeamQuery } from "../../../../../features/team/teamApi";
import Loading from "../../../../components/Loading";
import MemberList from "./MemberList";
import MembersTitle from "./MembersTitle";
const Members = ({ id }) => {
  // getting members
  const {
    data: { members, color, createdBy: { email: createdBy } } = {},
    isLoading: membersLoading,
    isError: isMemberError,
  } = useGetTeamQuery(id);

  // dynamic content holder
  let membersContent;

  // decide what to render
  if (members?.length > 0) {
    membersContent = members?.map((member) => (
      <MemberList
        key={member.id}
        teamId={id}
        member={member}
        color={color}
        members={members}
        createdBy={createdBy}
      />
    ));
  } else if (isMemberError) {
    membersContent = (
      <p className="text-red-500 text-xs py-1 px-3 bg-red-100 rounded-md mt-1">
        {"There was some error getting members"}
      </p>
    );
  } else {
    membersContent = (
      <p className="text-red-500 text-xs py-1 px-3 bg-red-100 rounded-md mt-1">
        {"Something very strange happened"}
      </p>
    );
  }
  return (
    <ul className="flex gap-1 flex-col flex-shrink-0 ">
      <Loading visible={membersLoading} />
      <MembersTitle members={members} color={color} />
      <ScrollBar className=" space-y-1 max-h-[125px] overflow-auto pr-2 ">
        {membersContent}
      </ScrollBar>
    </ul>
  );
};

export default Members;
