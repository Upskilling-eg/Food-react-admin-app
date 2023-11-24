import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import axios from "axios";
import noData from "../../../assets/images/no-data.png";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";

export default function RecipesList() {
  const [RecipesList, setRecipesList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const handleClose = () => setModalState("close");

  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };

  const deleteRecipe = () => {
    axios
      .delete(`http://upskilling-egypt.com:3002/api/v1/Recipe/${itemId}`, {
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
        getAllRecipes();
      })
      .catch((error) => console.log(error));
  };

  const getAllRecipes = () => {
    axios
      .get(
        "http://upskilling-egypt.com:3002/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setRecipesList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllRecipes();
  }, []);
  return (
    <>
      <ToastContainer />
      <Modal show={modalState === "delete-modal"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <img src={noData} alt="" />
            <h5 className="my-2">Delete This Item ?</h5>
            <span className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </span>
            <div className="text-end my-3">
              <button onClick={deleteRecipe} className="btn btn-outline-danger">
                Delete this item
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Header
        title={"Recipes Items"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <div className="row  mx-4 p-3">
        <div className="col-md-6">
          <div>
            <h6>Recipes Table Details</h6>
            <span>You can check all details</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-end">
            <button className="btn btn-success">Add New Recipe</button>
          </div>
        </div>

        <div>
          {RecipesList.length > 0 ? (
            <table className="table my-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Recipe Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {RecipesList.map((recipe) => (
                  <tr key={recipe.id}>
                    <th scope="row">{recipe.id}</th>
                    <td>{recipe.name}</td>

                    <td>
                      <div className="img-container">
                        {recipe.imagePath ? (
                          <img
                            className="img-fluid"
                            src={
                              `http://upskilling-egypt.com:3002/` +
                              recipe.imagePath
                            }
                            alt=""
                          />
                        ) : (
                          <img className="img-fluid" src={noData} alt="" />
                        )}
                      </div>
                    </td>

                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.category[0]?.name}</td>
                    <td>{recipe.tag.name}</td>

                    <td>
                      {/* <i
                        onClick={() => showUpdateModal(category)}
                        className="fa fa-edit text-warning fa-2x mx-2"
                      ></i> */}
                      <i
                        onClick={() => showDeleteModal(recipe.id)}
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
