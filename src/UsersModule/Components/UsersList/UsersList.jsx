import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import axios from "axios";
import noData from "../../../assets/images/no-data.png";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [pagesArray, setPagesArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(0);

  const handleClose = () => setModalState("close");

  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };

  const deleteUser = () => {
    axios
      .delete(`https://upskilling-egypt.com/api/v1/Users/${itemId}`, {
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
        getAllUsers(1);
      })
      .catch((error) => console.log(error));
  };
  const getAllUsers = (pageNo, name, gpId) => {
    axios
      .get("https://upskilling-egypt.com/api/v1/Users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: {
          pageNumber: pageNo,
          pageSize: 5,
          userName: name,
          groups: gpId,
        },
      })
      .then((response) => {
        setPagesArray(
          Array(response?.data?.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setUsersList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNameValue = (input) => {
    setSearchString(input.target.value);
    getAllUsers(1, input.target.value , selectedRoleId);
  };

  const getRoleValue = (select) => {
    setSelectedRoleId(select.target.value);
    getAllUsers(1, searchString, select.target.value);
  };

  useEffect(() => {
    getAllUsers(1);
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
              <button onClick={deleteUser} className="btn btn-outline-danger">
                Delete this item
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Header
        title={"Users List"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="row  mx-4 p-3">
        <h6>Users Table Details</h6>
        <span className="text-muted">You can check all details</span>

        <div>
          <div className="row my-2">
            <div className="col-md-6">
              <div>
                <input
                  onChange={getNameValue}
                  placeholder="search by user name..."
                  className="form-control "
                  type="text"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div>
                <select onChange={getRoleValue} className="form-select">
                  <option value="" className="text-muted">
                    search by role
                  </option>
                  <option value="1">admin</option>
                  <option value="2">user</option>
                </select>
              </div>
            </div>
          </div>

          {usersList.length > 0 ? (
            <div>
              <div>
                <div className="table-responsive">
                <table className="table  table-striped my-2">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">phoneNumber</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.userName}</td>
                        <td>
                          <div className="img-container">
                            {user.imagePath ? (
                              <img
                                className="img-fluid"
                                src={
                                  `https://upskilling-egypt.com/` +
                                  user.imagePath
                                }
                                alt=""
                              />
                            ) : (
                              <img className="img-fluid" src={noData} alt="" />
                            )}
                          </div>
                        </td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          <i
                            onClick={() => showDeleteModal(user.id)}
                            className="fa fa-trash text-danger  ms-3"
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
                        onClick={() => getAllUsers(pageNo,searchString,selectedRoleId)}
                        className="page-item"
                      >
                        <a className="page-link">{pageNo}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
