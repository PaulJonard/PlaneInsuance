import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Connection from '../components/ConnectWallet.js'
import "./NavBar.css";

import { web3 } from  'web3'

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => 
  {
    setClick(!click);
  
  }
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Plane Insuance
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/AvailableFlights"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Vols
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/MyFlights"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Mes vols
              </NavLink>
            </li>
            <li className="nav-item">
              <Connection />
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;