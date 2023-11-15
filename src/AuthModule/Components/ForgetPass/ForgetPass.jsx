import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .put(
        "http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        toast(error.response.data.message);
      });
  };

  return (
    <div className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white p-2">
            <div className="logo-cont text-center">
              <img src={logo} className="w-25" alt="logo" />
            </div>
            <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h2>Change Your Password</h2>
              <p>Enter your details below</p>

              <div className="form-group my-3">
                <input
                  placeholder="Old Password"
                  className="form-control"
                  type="password"
                  {...register("oldPassword", {
                    required: true,
                  })}
                />
                {errors.oldPassword &&
                  errors.oldPassword.type === "required" && (
                    <span className="text-danger">oldPassword is required</span>
                  )}
              </div>
              <div className="form-group my-3">
                <input
                  placeholder="New Password"
                  className="form-control"
                  type="password"
                  {...register("newPassword", {
                    required: true,
                  })}
                />
                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <span className="text-danger">newPassword is required</span>
                  )}
              </div>
              <div className="form-group my-3">
                <input
                  placeholder="Confirm New Password"
                  className="form-control"
                  type="password"
                  {...register("confirmNewPassword", {
                    required: true,
                  })}
                />
                {errors.confirmNewPassword &&
                  errors.confirmNewPassword.type === "required" && (
                    <span className="text-danger">
                      confirmNewPassword is required
                    </span>
                  )}
              </div>
              <div className="form-group my-3">
                <button className="btn btn-success w-100">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
