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
  const [pagesArray, setPagesArray] = useState([]);
  const onSubmit = (data) => {
    axios
      .post("https://upskilling-egypt.com/api/v1/Category/", data, {
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
  const [searchString, setSearchString] = useState("");

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
      .delete(`https://upskilling-egypt.com/api/v1/Category/${itemId}`, {
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
      .put(`https://upskilling-egypt.com/api/v1/Category/${itemId}`, data, {
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
  const getCategoriesList = (pageNo, name) => {
    axios
      .get("https://upskilling-egypt.com/api/v1/Category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: {
          pageSize: 5,
          pageNumber: pageNo,
          name: name,
        },
      })
      .then((response) => {
        // [ 1,2 ,3 , , , , , ,100 ]
        // Array(100).fill().map((_,shimaa)=>shimaa+1)
        setPagesArray(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setCategoriesList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNameValue = (input) => {
    setSearchString(input.target.value);
    getCategoriesList(1, input.target.value);
  };
  useEffect(() => {
    getCategoriesList(1);
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
          <input
            onChange={getNameValue}
            placeholder="search by category name..."
            className="form-control my-2"
            type="text"
          />
          {categoriesList.length > 0 ? (
            <div>
                              <div className="table-responsive">

              <table className="table  table-striped my-2">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesList.map((category, index) => (
                    <tr key={category.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{category.name}</td>
                      <td>
                        <i
                          onClick={() => showUpdateModal(category)}
                          className="fa fa-edit text-warning mx-2"
                        ></i>
                        <i
                          onClick={() => showDeleteModal(category.id)}
                          className="fa fa-trash text-danger "
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <nav className="d-flex justify-content-center"  aria-label="...">
                <ul className="pagination pagination-sm">
                  {pagesArray.map((pageNo) => (
                    <li
                      key={pageNo}
                      onClick={() => getCategoriesList(pageNo, searchString)}
                      className="page-item"
                    >
                      <a className="page-link">{pageNo}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
