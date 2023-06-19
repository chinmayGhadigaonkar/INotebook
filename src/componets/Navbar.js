import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let username = localStorage.getItem("email");
  const logouthandle = () => {
    localStorage.removeItem("autotoken");
    localStorage.removeItem("login.email");
    navigate("/Login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            INotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/Aboutus"
                >
                  About us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {!localStorage.getItem("autotoken") ? (
              <div>
                <Link
                  className="btn btn-primary my-1"
                  aria-current="page"
                  to="/Login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-primary mx-2"
                  aria-current="page"
                  to="/Signup"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div>
                Welcome <strong className="mx-1 h5">{username.slice(0,15)+"..."}</strong>
                <button
                  className="btn btn-primary mx-1 "
                  onClick={logouthandle}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
