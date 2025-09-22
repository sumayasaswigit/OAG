import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NotFound from "../main/NotFound";


import MyArtWork from "./MyArtWork";
import UploadArtWork from "./UploadArtWork";
import HostAnAuction from "./HostAnAuction";
import Profile from "./Profile";
import { IoPersonSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import Login from "../authentication/Login";
import { useAuth } from "../contextapi/AuthContext";

import "./styles/SellerNavbar.css";
import EditArtwork from "./EditArtwork";
import SellerHome from "./SellerHome";

const SellerNavbar = () => {
  const { setIsSellerLoggedIn, setUsername } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setIsSellerLoggedIn(false);
    setUsername(null);
    setMenuOpen(false); // close menu on logout
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        <div className="nav-start-section">
          <Link to="/sellerhome" onClick={() => setMenuOpen(false)}>
            <strong>Asthetica</strong>
          </Link>
          <div className="burger-icon" onClick={toggleMenu}>
            {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </div>
        </div>

        <div className={`nav-mid-section ${menuOpen ? "open" : ""}`}>
          <Link to="/myartwork" onClick={() => setMenuOpen(false)}>
            MyArtWork
          </Link>
          <Link to="/uploadartwork" onClick={() => setMenuOpen(false)}>
            UploadArtWork
          </Link>
          <Link to="/hostanauction" onClick={() => setMenuOpen(false)}>
            HostAnAuction
          </Link>
       
        </div>

        <div className={`nav-end-section ${menuOpen ? "open" : ""}`}>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            <IoPersonSharp /> Profile
          </Link>
          <Link to="/login" onClick={handleClick}>
            <button className="btn-login">logout</button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/sellerhome" element={<SellerHome/>} />
        <Route path="/myartwork" element={<MyArtWork />} />
        <Route path="/uploadartwork" element={<UploadArtWork />} />
        <Route path="/hostanauction" element={<HostAnAuction />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<EditArtwork/>}/>
        <Route path="*" Component={NotFound} />
      </Routes>
    </div>
  );
};

export default SellerNavbar;
