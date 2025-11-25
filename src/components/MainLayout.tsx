import { Outlet } from "@tanstack/react-router";
import React from "react";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <div className="core_screen core_flexCol">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
