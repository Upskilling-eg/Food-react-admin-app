import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../../../assets/images/3.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ChangePass from "../../../AuthModule/Components/ChangePass/ChangePass";

export default function SideBar() {
  let [isCollapsed, setIsCollapsed] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <Modal show={show} onHide={handleClose}>
      
        <Modal.Body>
          <ChangePass handleClose={handleClose}/>
        </Modal.Body>
        
      </Modal>
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
          className="logo-toggle"
            onClick={handleToggle}
            icon={<img src={logo} alt="" />}
          ></MenuItem>
          <MenuItem
            icon={<i className="fa fa-home" aria-hidden="true"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-users" aria-hidden="true"></i>}
            component={<Link to="/dashboard/users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<i className="fas fa-pizza-slice"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-burger"></i>}
            component={<Link to="/dashboard/categories" />}
          >
            Categories
          </MenuItem>
          <MenuItem
            onClick={handleShow}
            icon={<i className="fa fa-key" aria-hidden="true"></i>}
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            onClick={logOut}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>

    // <div>
    //   SideBar
    //   <button className="btn btn-danger" onClick={logOut}>
    //     Logout
    //   </button>
    // </div>
  );
}
