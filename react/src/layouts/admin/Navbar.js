import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";

const Navbar = () => {
  const history = useHistory();

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand ps-3" to="/admin">Cloth Rental</Link>

      <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
        <i className="fas fa-bars"></i>
      </button>

      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          {/* <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" /> */}
          {/* <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button> */}
        </div>
      </form>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={logoutSubmit}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
