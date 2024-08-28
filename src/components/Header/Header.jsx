import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase-conf";
import { signOut } from "@firebase/auth";

import { useState } from "react";

import { BsGear, BsBoxArrowRight } from "react-icons/bs";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  auth.onAuthStateChanged((e) => setLoggedIn(e != null));

  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container">
        <Link class="navbar-brand" to="/">
          E-Nutritionist
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/ads">
                Nutricionists
              </Link>
            </li>
          </ul>
          {!loggedIn ? (
            <Link className="btn btn-outline-success" type="submit" to="/auth">
              Log in
            </Link>
          ) : (
            <div className="dropdown text-end">
              <a
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth.currentUser.email}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to={"/profile-settings"}>
                    <BsGear className="me-1 mb-1" /> Settings
                  </Link>
                </li>
                <li>
                  <a
                    className="dropdown-item text-danger"
                    href="#"
                    onClick={() => signOut(auth)}
                  >
                    <BsBoxArrowRight className="me-1 mb-1" /> Log out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
