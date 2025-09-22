import React from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './styles/Footer.css'
import { IoMdCall } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <div className="footer-header">
          <h2>Asthetica</h2>
          <p>Art washes away from the soul the dust of everyday life.</p>
          <h4>Follow us on</h4>
          <div className="footer-follow-links">
            <Link>
              <FaFacebook />
            </Link>
            <Link>
              <FaInstagram />
            </Link>
            <Link>
              <FaXTwitter />
            </Link>
          </div>
        </div>
        <div className="footer-quick-links">
          <h3 style={{ marginBottom: "0.2rem" }}>Quick Links</h3>
          <Link to="/discover">Discover</Link>
          <Link to="/artists">Artists</Link>
          <Link to="/auctions">Auctions</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
        </div>
        <div className="footer-contacts">
          <div className="footer-newsletter">
            <p>
              <em>Subscribe to Our Newsletter for Exclusive Art&Updates</em>
            </p>
            <div className="newsletter-mail-box">
              <input type="email" placeholder="example@gmail.com" />
              <Link>
                <IoSend />
              </Link>
            </div>
          </div>
          <div className="footer-contact-section">
            <h4>Contact Us</h4>
            <p><IoMdCall style={{color:'white'}}/> Phone: 9090909090</p>
            <p><MdOutlineMail style={{color:'white'}}/> Email: 2300030317@kluniversity.in</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          © {new Date().getFullYear()} Asthetica. All Rights Reserved. Designed and Developed by {""}
          <a href="https://github.com/phanee27" target="_blank" style={{ color: "lightblue", textDecoration: "none"}} >K V Paneendra</a>
          {",  "}
          <a href="https://github.com/isuryaprakashh" target="_blank" style={{ color: "lightblue", textDecoration: "none" }}>I Surya Prakash</a>
          {" and "}
          <a href="https://github.com/CharanTeja-6825" target="_blank" style={{ color: "lightblue", textDecoration: "none" }}>R Charan Teja</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
