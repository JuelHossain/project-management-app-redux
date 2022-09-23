import React from "react";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import CreateUser from "./CreateUser";
import ManageUsers from "./ManageUsers";
import Profile from "./Profile";
import UserProject from "./UserProject";
import UserTeams from "./UserTeams";

const User = () => {
  const { admin } = useSelector((state) => state.auth.user);

  return (
    <PageContainer>
      <div className="flex items-center justify-center  p-4 sm:p-10 ">
        <div className="flex flex-wrap flex-1 gap-6 ">
          <div className="  space-y-6 flex flex-col justify-center flex-1 ">
            <Profile />

            {!!admin && (
              <div className="flex-1 flex flex-col sm:flex-row justify-center gap-6">
                <CreateUser />
                <ManageUsers />
              </div>
            )}
          </div>
          <div className=" gap-6 flex flex-col lg:flex-row justify-center flex-1">
            <UserProject />
            <UserTeams />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default User;
