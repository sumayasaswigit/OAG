import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NotFound from "../main/NotFound";

import CustomerHome from "./CustomerHome";
import Artists from "./Artist";
import Auctions from "./Auctions";
import Search from "./Search";
import Wishlist from "./Wishlist";
import Profile from "./Profile";

import { IoSearchSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import Login from "../authentication/Login";
import Registration from "../authentication/Registration";

import "./styles/CustomerNavbar.css";
import Discover from "./Discover";

import { useAuth } from "../contextapi/AuthContext";
import ViewProduct from "./ViewProduct";
import MyOrders from "./MyOrders";


const CustomerNavbar = () => {
  const { setIsCustomerLoggedIn, setUsername } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setIsCustomerLoggedIn(false);
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
          <Link to="/customerhome" onClick={() => setMenuOpen(false)}>
            <strong>Asthetica</strong>
          </Link>
          <div className="burger-icon" onClick={toggleMenu}>
          {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </div>
        </div>

        <div className={`nav-mid-section ${menuOpen ? "open" : ""}`}>
          <Link to="/discover" onClick={() => setMenuOpen(false)}>Discover</Link>
          <Link to="/artists" onClick={() => setMenuOpen(false)}>Artists</Link>
          <Link to="/auctions" onClick={() => setMenuOpen(false)}>Auctions</Link>
          <Link to='/myorders' onClick={()=> setMenuOpen(false)}>My Orders</Link>
        </div>

        <div className={`nav-end-section ${menuOpen ? "open" : ""}`}>
          {/* <Link to="/search" onClick={() => setMenuOpen(false)}><IoSearchSharp /></Link> */}
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}><IoMdHeart /></Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}><IoPersonSharp /></Link>
          <Link to="/login" onClick={handleClick}>
            <button className="btn-login">logout</button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/myorders" element={<MyOrders/>}/>
        <Route path="*" Component={NotFound} />
        <Route path="/view-product/:id" element={<ViewProduct/>}/>
      </Routes>
    </div>
  );
};

export default CustomerNavbar;
