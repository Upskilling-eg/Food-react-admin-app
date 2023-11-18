import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import header from "../../../assets/images/header.png";

export default function MasterLayout({ adminData }) {
  const location = useLocation();
  return (
    <>
      <div className="d-flex">
        <div>
          <div>
            <SideBar />
          </div>
        </div>
        <div className="w-100">
          <div>
            <Navbar adminData={adminData} />

            <Header pathName={location.pathname} adminData={adminData}/>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
