import React from "react";
import { FaSearch, FaHome, FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import "./NavigationBarStyle.css";

export default function NavigationBar() {
  return (
    <div className="navigation-bar-container">
      <div className="icons-container">
        <Link to="/profiles" className="nav-bar-icon">
          <i  id="profile-icon">
            <CgProfile />
          </i>
        </Link>
        <Link to="/search" className="nav-bar-icon">
        <i id="search-icon">
          <FaSearch />
        </i>
        </Link>
        <Link to="/" className="nav-bar-icon">
          <i className="nav-bar-icon" id="home-icon">
            <FaHome />
          </i>
        </Link>
        <i className="nav-bar-icon" id="tv-icon">
          <FaCalendarAlt />
        </i>
        <i className="nav-bar-icon" id="settings-icon">
          <IoMdSettings />
        </i>
      </div>
    </div>
  );
}
