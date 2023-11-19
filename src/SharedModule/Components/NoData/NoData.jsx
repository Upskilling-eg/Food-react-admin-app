import React from "react";
import noData from "../../../assets/images/no-data.png";

export default function NoData() {
  return (
    <>
      <div className="text-center">
        <img className="my-3" src={noData} alt="" />
        <h4>No data found</h4>
      </div>
    </>
  );
}
