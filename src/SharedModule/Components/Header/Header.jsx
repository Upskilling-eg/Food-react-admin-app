import React from "react";
import headerBg from "../../../assets/images/header.png";

export default function Header({ title, paragraph }) {
  return (
    <>
      <div className="header-content m-2 rounded-3 text-white">
        <div className="container-fluid">
          <div className="row px-4 py-2 g-0 align-items-center">
            <div className="col-sm-10">
              <h2>{title}</h2>
              <p>{paragraph}</p>
            </div>
            <div className="col-sm-2 text-center">
              <img src={headerBg} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
