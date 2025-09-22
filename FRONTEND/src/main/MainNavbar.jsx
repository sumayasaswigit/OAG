import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import MainHome from './MainHome';
import MainAbout from './MainAbout';
import NotFound from './NotFound';
import { Login } from '../authentication/Login';
import Registration from '../authentication/Registration';

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import './styles/MainNavbar.css';

const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        <div className="nav-start-section">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <strong>Asthetica</strong>
          </Link>
          <div className="burger-icon" onClick={toggleMenu}>
            {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </div>
        </div>

        <div className={`nav-mid-section ${menuOpen ? "open" : ""}`}>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/about" element={<MainAbout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default MainNavbar;
