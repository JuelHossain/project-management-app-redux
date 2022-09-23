import React from "react";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import CreateUser from "./CreateUser";
import ManageUsers from "./ManageUsers";
import Profile from "./Profile";
import UserProjects from "./UserProject";
import UserTeams from "./UserTeams";

const User = () => {
  const { admin } = useSelector((state) => state.auth.user);

  return (
    <PageContainer>
      <div className="flex items-center justify-center  p-4 sm:p-10 w-full">
        <div className="flex flex-wrap flex-1 gap-6 flex-col mx-auto max-w-6xl ">
          <Profile />

          <div className="flex-1 flex flex-col md:flex-row justify-center gap-6">
            {!!admin && (
              <>
                <CreateUser />
                <ManageUsers />
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col md:flex-row justify-center gap-6">
            <UserProjects />
            <UserTeams />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default User;
