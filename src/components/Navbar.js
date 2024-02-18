import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Sportify
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse navbar-dark bg-dark" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/Events">
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Leagues">
              Leagues
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Favorites
            </Link>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" to="/favorites/leagues">
                 Favorite Leagues
              </Link>
              <Link className="dropdown-item" to="/favorites/teams">
                Favorite Teams
              </Link>
              <Link className="dropdown-item" to="/favorites/players">
                Favorite Players
              </Link>
              <Link className="dropdown-item" to="/favorites/events">
                Favorite Events
              </Link>
              <Link className="dropdown-item" to="/favorites/highlights">
                Favorite Highlights
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
