import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({saveAdminData}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Login", data)
      .then((response) => {
        // setTimeout(toast("Wow logiiiiiiiiiin!"), 2000);
        localStorage.setItem("adminToken",response.data.token);
        saveAdminData();
        navigate("/dashboard");
      })
      .catch((error) => {
        toast(error.response.data.message);
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
              <h4 className="fw-bolder">Log In</h4>
              <span className="text-muted">Welcome Back! Please enter your details</span>
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
              
              <div className="form-group my-3 position-relative">
              <i className="fa fa-key position-absolute"></i>

                <input
                  placeholder="Password"
                  className="form-control ps-4 mb-1"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">password is required</span>
                )}
              </div>

              <div className="form-group my-3 position-relative d-flex justify-content-end">
                 <Link to='/forget-pass' className="text-success">Forgot Password?</Link>
              </div>

              <div className="form-group my-3">
                <button className="btn w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
