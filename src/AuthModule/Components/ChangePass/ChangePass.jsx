import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ChangePass({ handleClose }) {
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
        handleClose();
        toast.success("password changed successsfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div className="container-fluid">
      <ToastContainer />

      <div className="row justify-content-center align-items-center">
        <div className="col-sm-12">
          <div className="bg-white py-4 rounded-2">
            <div className="logo-cont text-center">
              <img src={logo} className="w-50" alt="logo" />
            </div>
            <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="fw-bolder fs-6">Change Your Password</h4>
              <span className="text-muted">Enter your details below</span>
              <div className="form-group my-3 position-relative">
                <i className="fa fa-key position-absolute"></i>

                <input
                  placeholder="Old Password"
                  className="form-control ps-4 mb-1"
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
              <div className="form-group my-3 position-relative">
                <i className="fa fa-key position-absolute"></i>

                <input
                  placeholder="New Password"
                  className="form-control ps-4 mb-1"
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
              <div className="form-group my-3 position-relative">
                <i className="fa fa-key position-absolute"></i>

                <input
                  placeholder="Confirm New Password"
                  className="form-control ps-4 mb-1"
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
                <button className="btn  w-100">Change Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
