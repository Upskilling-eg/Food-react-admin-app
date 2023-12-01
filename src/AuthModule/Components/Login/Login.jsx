import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../../assets/images/logo.png";

export default function Login({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/dashboard");
    }
  }, []);

  const onSubmit = (data) => {
    axios
      .post("https://upskilling-egypt.com/api/v1/Users/Login", data)
      .then((response) => {
        localStorage.setItem("adminToken", response.data.token);
        saveAdminData();
        navigate("/dashboard");

        setTimeout(() => {
          toast.success("login successsfully", {
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
          autoClose: 5000,
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
              <h4 className="fw-bolder">Log In</h4>
              <span className="text-muted">
                Welcome Back! Please enter your details
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
                <Link to="/reset-pass-request" className="text-success">
                  Forgot Password?
                </Link>
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
