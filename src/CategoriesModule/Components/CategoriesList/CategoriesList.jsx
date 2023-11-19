import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

export default function CategoriesList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Category/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        ///////////////////////////////
        handleClose();
        getCategoriesList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [categoriesList, setCategoriesList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCategoriesList = () => {
    axios
      .get(
        "http://upskilling-egypt.com:3002/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        setCategoriesList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <>
      <Header
        title={"Categories Items"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h4>add new category</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group my-3">
              <input
                type="text"
                className="form-control"
                placeholder="please enter category name"
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-danger my-2">field is required</span>
              )}
            </div>
            <div className="form-group">
              <button className="btn btn-success w-100">Add Category</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="row  mx-4 p-3">
        <div className="col-md-6">
          <div>
            <h6>Categories Table Details</h6>
            <span>You can check all details</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-end">
            <button onClick={handleShow} className="btn btn-success">
              Add New Category
            </button>
          </div>
        </div>

        <div>
          {categoriesList.length > 0 ? (
            <table className="table my-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.map((category) => (
                  <tr key={category.id}>
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
