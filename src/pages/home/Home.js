import React from "react";
import { Outlet } from "react-router-dom";
import Protected from "../auth/Protected";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

const Home = () => {
  return (
    <Protected>
      <div className="h-screen flex flex-col w-screen  justify-between">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Protected>
  );
};

export default Home;
