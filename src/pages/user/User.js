import React from "react";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import CreateUser from "./CreateUser";
import ManageUsers from "./ManageUsers";

const User = () => {
  const { admin } = useSelector((state) => state.auth.user);

  return (
    <PageContainer>
      {!!admin && (
        <div className="flex items-">
          <CreateUser />
          <ManageUsers />
        </div>
      )}
    </PageContainer>
  );
};

export default User;
