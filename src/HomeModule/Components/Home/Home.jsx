import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../../SharedModule/Components/Header/Header";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Header
        title={"welcome Homeeeeeeeee"}
        paragraph={"Homeeeeeeeee parapohrah"}
      />

      <div className="row section-container mx-4 py-4 rounded-2 align-items-center">
        <div className="col-md-6">
          <div>
            <h4>Fill the Recipes !</h4>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="text-end">
            <button className="btn btn-success ">
              <Link className="text-white text-decoration-none" to="/dashboard/recipes">
              
                Fill Recipes
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
