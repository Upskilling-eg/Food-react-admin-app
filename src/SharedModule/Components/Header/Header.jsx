import React from "react";
import headerBg from "../../../assets/images/header.png";

export default function Header({ pathName, adminData }) {
  return (
    <>
      {pathName == "/dashboard" ? (
        <div className="header-content m-2 rounded-3 text-white">
          <div className="container-fluid">
            <div className="row px-4 py-2 g-0 align-items-center">
              <div className="col-sm-10">
                <h2>Welcome {adminData.userName}</h2>
                <p>
                  This is a welcoming screen for the entry of the application ,
                  you can now see the options
                </p>
              </div>
              <div className="col-sm-2 text-center">
                <img src={headerBg} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      ) : pathName == "/dashboard/users" ? (
        <div className="header-content m-2 text-white">
          <div className="container-fluid">
            <div className="row px-4 py-2 align-items-center">
              <div className="col-sm-10">
                <h2>Welcome Users</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
                  officia qui debitis similique! Quo odio voluptate corrupti
                  deleniti? Assumenda quae fugiat adipisci ipsum at non, et
                  voluptates consequuntur, minima praesentium aspernatur maxime
                  obcaecati enim. Repellendus repudiandae ducimus ex fugiat
                  dolore!
                </p>
              </div>
              <div className="col-sm-2 text-center">
                <img src={headerBg} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      ) : pathName == "/dashboard/recipes" ? (
        <div className="header-content m-2 text-white">
          <div className="container-fluid">
            <div className="row px-4 py-2 align-items-center">
              <div className="col-sm-10">
                <h2>Welcome Recipes</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
                  officia qui debitis similique! Quo odio voluptate corrupti
                  deleniti? Assumenda quae fugiat adipisci ipsum at non, et
                  voluptates consequuntur, minima praesentium aspernatur maxime
                  obcaecati enim. Repellendus repudiandae ducimus ex fugiat
                  dolore!
                </p>
              </div>
              <div className="col-sm-2 text-center">
                <img src={headerBg} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-content m-2 text-white">
          <div className="container-fluid">
            <div className="row px-4 py-2 align-items-center">
              <div className="col-sm-10">
                <h2>Welcome Categories</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
                  officia qui debitis similique! Quo odio voluptate corrupti
                  deleniti? Assumenda quae fugiat adipisci ipsum at non, et
                  voluptates consequuntur, minima praesentium aspernatur maxime
                  obcaecati enim. Repellendus repudiandae ducimus ex fugiat
                  dolore!
                </p>
              </div>
              <div className="col-sm-2 text-center">
                <img src={headerBg} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
