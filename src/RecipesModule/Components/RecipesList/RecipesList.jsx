import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import axios from "axios";
import noData from "../../../assets/images/no-data.png";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

export default function RecipesList() {
  const [RecipesList, setRecipesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [categorisList, setCategoriesList] = useState([]);

  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addRecipe = (data) => {
    const formData = new FormData();
    formData.append("recipeImage", data["recipeImage"][0]);
    formData.append("name", JSON.stringify(data["name"]));
    formData.append("description", JSON.stringify(data["description"]));
    formData.append("price", data["price"]);
    formData.append("tagId", data["tagId"]);
    formData.append("categoriesIds", data["categoriesIds"]);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // for (const key in data) {
    //   if (key === "recipeImage") {
    //     formData.append(key, data[key][0]);
    //   } else {
    //     formData.append(key, data[key]);
    //   }
    // }
    data.recipeImage = data.recipeImage[0];
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Recipe", formData, {
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
        getAllRecipes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => setModalState("close");

  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };

  const showAddModal = () => {
    setModalState("add-modal");
    getAllTags();
    getAllCategories();
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

  const getAllTags = () => {
    axios
      .get("http://upskilling-egypt.com:3002/api/v1/tag/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        setTagsList(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllCategories = () => {
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
        console.log(response?.data?.data);
        setCategoriesList(response?.data?.data);
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
      <Modal show={modalState === "add-modal"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <h4>Add new recipe</h4>
            <form onSubmit={handleSubmit(addRecipe)}>
              <div className="form-group my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="please enter recipe name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger my-2">field is required</span>
                )}
              </div>
              <div className="form-group my-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="please enter recipe price"
                  {...register("price", {
                    required: true,
                  })}
                />
                {errors.price && errors.price.type === "required" && (
                  <span className="text-danger my-2">field is required</span>
                )}
              </div>
              <div className="form-group my-3">
                <textarea
                  className="form-control"
                  placeholder="please enter recipe description"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="text-danger my-2">field is required</span>
                  )}
              </div>
              <div className="form-group my-3">
                <select
                  className="form-select"
                  {...register("tagId", {
                    required: true,
                    valueAsNumber: true,
                  })}
                >
                  <option className="text-muted" value="">
                    enter tag id
                  </option>
                  {tagsList?.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                {errors.tagId && errors.tagId.type === "required" && (
                  <span className="text-danger my-2">field is required</span>
                )}
              </div>
              <div className="form-group my-3">
                <select
                  className="form-select"
                  {...register("categoriesIds", {
                    required: true,
                  })}
                >
                  <option className="text-muted" value="">
                    enter category id
                  </option>

                  {categorisList?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoriesIds &&
                  errors.categoriesIds.type === "required" && (
                    <span className="text-danger my-2">field is required</span>
                  )}
              </div>

              <div className="form-group my-3">
                <input
                  {...register("recipeImage")}
                  className="form-control form-control-lg"
                  id="formFileLg"
                  type="file"
                  accept="image/*"
                />
              </div>

              <div className="form-group">
                <button className="btn btn-success w-100">Add Recipe</button>
              </div>
            </form>
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
            <button onClick={showAddModal} className="btn btn-success">
              Add New Recipe
            </button>
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
