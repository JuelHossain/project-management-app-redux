import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Protected from "../auth/Protected";

const Home = () => {
  return (
    <Protected>
      <Header />
      <Outlet />
    </Protected>
  );
};

export default Home;
