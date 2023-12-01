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
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [pagesArray, setPagesArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedCatId, setSelectedCatId] = useState(0);

  const [recipe, setRecipe] = useState();
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const handleClose = () => setModalState("close");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data["name"]);
    formData.append("price", data["price"]);
    formData.append("description", data["description"]);
    formData.append("tagId", data["tagId"]);
    formData.append("categoriesIds", data["categoriesIds"]);
    formData.append("recipeImage", data["recipeImage"][0]);
    return formData;
  };
  const addRecipe = (data) => {
    const addFormData = appendToFormData(data);
    axios
      .post("https://upskilling-egypt.com/api/v1/Recipe/", addFormData, {
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
  const updateRecipe = (data) => {
    const updateFormData = appendToFormData(data);

    axios
      .put(
        `https://upskilling-egypt.com/api/v1/Recipe/${itemId}`,
        updateFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        toast.success("Updated successsfully", {
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
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };
  const showAddModal = () => {
    setModalState("add-modal");
  };
  const showUpdateModal = (item) => {
    setRecipe(item);
    setValue("name", item.name);
    setValue("description", item.description);
    setValue("price", item.price);
    setValue("tagId", item.tag.id);
    setValue("categoriesIds", item.category[0].id);
    setValue("", item.category[0].id);
    setItemId(item.id);
    setModalState("update-modal");
  };
  const getAllTags = () => {
    axios
      .get(`https://upskilling-egypt.com/api/v1/tag/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        setTagsList(response.data);
      })
      .catch((error) => console.log(error));
  };
  const getAllCategories = () => {
    axios
      .get(
        "https://upskilling-egypt.com/api/v1/Category/?pageSize=20&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        setCategoriesList(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const deleteRecipe = () => {
    axios
      .delete(`https://upskilling-egypt.com/api/v1/Recipe/${itemId}`, {
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
  const getAllRecipes = (pageNo, name, tagId, categoryId) => {
    axios
      .get(`https://upskilling-egypt.com/api/v1/Recipe/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: {
          pageSize: 5,
          pageNumber: pageNo,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      })
      .then((response) => {
        setPagesArray(
          Array(response?.data?.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setRecipesList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNameValue = (input) => {
    setSearchString(input.target.value);
    getAllRecipes(1, input.target.value, selectedTagId, selectedCatId);
  };

  const getTagValue = (select) => {
    setSelectedTagId(select.target.value);
    getAllRecipes(1, searchString, select.target.value, selectedCatId);
  };
  const getCategoryValue = (select) => {
    setSelectedCatId(select.target.value);
    getAllRecipes(1, searchString, selectedTagId, select.target.value);
  };

  useEffect(() => {
    getAllCategories();
    getAllTags();
    getAllRecipes(1);
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
            <h3>Add new recipe</h3>
            <form onSubmit={handleSubmit(addRecipe)}>
              <div className="form-group my-2">
                <input
                  placeholder="please enter recipe name"
                  className="form-control"
                  type="text"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">field is required</span>
                )}
              </div>
              <div className="form-group my-2">
                <input
                  className="form-control"
                  type="number"
                  placeholder="please enter recipe price"
                  {...register("price", { required: true })}
                />
                {errors.price && errors.price.type === "required" && (
                  <span className="text-danger">field is required</span>
                )}
              </div>
              <div className="form-group my-2">
                <textarea
                  placeholder="please enter recipe description"
                  className="form-control"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="text-danger">field is required</span>
                  )}
              </div>
              <div className="form-group my-2">
                <select
                  {...register("tagId", {
                    required: true,
                  })}
                  className="form-select"
                >
                  {tagsList?.map((tag) => (
                    <option value={tag.id}>{tag.name}</option>
                  ))}
                </select>
                {errors.tagId && errors.tagId.type === "required" && (
                  <span className="text-danger">field is required</span>
                )}
              </div>
              <div className="form-group my-2">
                <select
                  {...register("categoriesIds", {
                    required: true,
                  })}
                  className="form-select"
                >
                  {categoriesList?.map((cat) => (
                    <option value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoriesIds &&
                  errors.categoriesIds.type === "required" && (
                    <span className="text-danger">field is required</span>
                  )}
              </div>

              <div className="form-group my-2">
                <input
                  {...register("recipeImage")}
                  className="form-control"
                  type="file"
                />
              </div>

              <div className="form-group my-2">
                <button className="btn btn-success w-100">Add recipe</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalState === "update-modal"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <h3>Update new recipe</h3>
            <form onSubmit={handleSubmit(updateRecipe)}>
              <div className="form-group my-2">
                <input
                  placeholder="please enter recipe name"
                  className="form-control"
                  type="text"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">field is required</span>
                )}
              </div>
              <div className="form-group my-2">
                <input
                  className="form-control"
                  type="number"
                  placeholder="please enter recipe price"
                  {...register("price", { required: true })}
                />
                {errors.price && errors.price.type === "required" && (
                  <span className="text-danger">field is required</span>
                )}
              </div>
              <div className="form-group my-2">
                <textarea
                  placeholder="please enter recipe description"
                  className="form-control"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="text-danger">field is required</span>
                  )}
              </div>
              <div className="form-group my-2">
                <select
                  {...register("tagId", {
                    required: true,
                  })}
                  className="form-select"
                >
                  {tagsList?.map((tag) => (
                    <option value={tag.id}>{tag.name}</option>
                  ))}
                </select>
                {errors.tagId && errors.tagId.type === "required" && (
                  <span className="text-danger">field is required</span>
                )}
              </div>
              <div className="form-group my-2">
                <select
                  {...register("categoriesIds", {
                    required: true,
                  })}
                  className="form-select"
                >
                  {categoriesList?.map((cat) => (
                    <option value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoriesIds &&
                  errors.categoriesIds.type === "required" && (
                    <span className="text-danger">field is required</span>
                  )}
              </div>

              <div className="form-group my-2">
                <input
                  {...register("recipeImage")}
                  className="form-control"
                  type="file"
                />
                <div className="img-container my-2">
                  <img
                    className="img-fluid"
                    src={`https://upskilling-egypt.com/` + recipe?.imagePath}
                    alt=""
                  />
                </div>
              </div>

              <div className="form-group my-2">
                <button className="btn btn-success w-100">Update recipe</button>
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
            <span className="text-muted">You can check all details</span>
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
          <div className="row  my-2">
            <div className="col-md-4">
              <input
                onChange={getNameValue}
                placeholder="search by recipe name..."
                className="form-control"
                type="text"
              />
            </div>
            <div className="col-md-4">
              <select onChange={getTagValue} className="form-select">
                <option value="" className="text-muted">
                  search by tag
                </option>
                {tagsList?.map((tag) => (
                  <option value={tag.id}>{tag.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select onChange={getCategoryValue} className="form-select">
                <option value="" className="text-muted">
                  search by category
                </option>

                {categoriesList?.map((cat) => (
                  <option value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          {RecipesList.length > 0 ? (
            <div>
              <div className="table-responsive">
                <table className="table  table-striped my-2">
                  <thead className="table-light">
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
                    {RecipesList.map((recipe, index) => (
                      <tr key={recipe.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{recipe.name}</td>

                        <td>
                          <div className="img-container">
                            {recipe.imagePath ? (
                              <img
                                className="img-fluid"
                                src={
                                  `https://upskilling-egypt.com/` +
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
                          <i
                            onClick={() => showUpdateModal(recipe)}
                            className="fa fa-edit text-warning   mx-2"
                          ></i>
                          <i
                            onClick={() => showDeleteModal(recipe.id)}
                            className="fa fa-trash text-danger  "
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav className="d-flex justify-content-center" aria-label="...">
                <ul className="pagination pagination-sm">
                  {pagesArray.map((pageNo) => (
                    <li
                      key={pageNo}
                      onClick={() => getAllRecipes(pageNo, searchString)}
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
