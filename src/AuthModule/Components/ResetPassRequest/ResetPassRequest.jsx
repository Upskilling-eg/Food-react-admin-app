import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ResetPassRequest() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Reset/Request", data)
      .then((response) => {
        navigate("/reset-pass");

        setTimeout(() => {
          toast.success("Mail sent successsfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }, 1);
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
    <div className="Auth-container container-fluid">
      <ToastContainer />
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-lg-5 col-md-7 col-sm-9">
          <div className="bg-white py-4 rounded-2">
            <div className="logo-cont text-center">
              <img src={logo} className="w-50" alt="logo" />
            </div>
            <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="fw-bolder fs-6">Request Reset Password</h4>
              <span className="text-muted">
                Please Enter Your Email And Check Your Inbox
              </span>
              <div className="form-group my-3 position-relative">
                <i className="fa fa-envelope-open position-absolute"></i>
                <input
                  placeholder="Enter your E-mail"
                  className="form-control ps-4 mb-1"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="text-danger">email is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-danger">invalid email</span>
                )}
              </div>

              <div className="form-group my-3">
                <button className="btn w-100">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
