import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import noData from "../../../assets/images/no-data.png";
import { ToastContainer, toast } from "react-toastify";

export default function CategoriesList() {
  const {
    register,
    handleSubmit,
    setValue,
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
        toast.success("added successsfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose();
        getCategoriesList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [categoriesList, setCategoriesList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);

  const showAddModal = () => {
    setValue("name", null);
    setModalState("modal-one");
  };

  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-two");
  };

  const showUpdateModal = (categoryItem) => {
    setItemId(categoryItem.id);
    setValue("name", categoryItem.name);
    setModalState("modal-three");
  };

  const handleClose = () => setModalState("close");
  const deleteCategory = () => {
    axios
      .delete(`http://upskilling-egypt.com:3002/api/v1/Category/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        toast.success("delete successsfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose();
        getCategoriesList();
      })
      .catch((error) => console.log(error));
  };

  const updateCategory = (data) => {
    axios
      .put(`http://upskilling-egypt.com:3002/api/v1/Category/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        toast.success("update successsfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose();
        getCategoriesList();
      })
      .catch((error) => console.log(error));
  };
  const getCategoriesList = () => {
    axios
      .get(
        "http://upskilling-egypt.com:3002/api/v1/Category/?pageSize=20&pageNumber=1",
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
      <ToastContainer />

      <Header
        title={"Categories Items"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <Modal show={modalState === "modal-one"} onHide={handleClose}>
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

      <Modal show={modalState === "modal-two"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <img src={noData} alt="" />
            <h5 className="my-2">Delete This Item ?</h5>
            <span className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </span>
            <div className="text-end my-3">
              <button
                onClick={deleteCategory}
                className="btn btn-outline-danger"
              >
                Delete this item
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalState === "modal-three"} onHide={handleClose}>
        <Modal.Body>
          <h4>update new category</h4>
          <form onSubmit={handleSubmit(updateCategory)}>
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
              <button className="btn btn-success w-100">Update Category</button>
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
            <button onClick={showAddModal} className="btn btn-success">
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
                    <td>
                      <i
                        onClick={() => showUpdateModal(category)}
                        className="fa fa-edit text-warning fa-2x mx-2"
                      ></i>
                      <i
                        onClick={() => showDeleteModal(category.id)}
                        className="fa fa-trash text-danger fa-2x"
                      ></i>
                    </td>
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
