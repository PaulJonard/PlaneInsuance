import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import Connection, { isConnected } from '../components/ConnectWallet.js'
import "./NavBar.css";

const root = window.location.pathname
const NavBar = () => {
  const click = useState(false);
  let connected = false;

  const handleClick = () => {
    if(isConnected() === "disconnected"){
      connected = false;
      window.location.replace(root)
    }
    else{
      connected = true
    }
  }
  
  return (    
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          <span className="plane">Plane</span><span className="hub">Hub</span>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to= "/"
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
              to= "/AvailableFlights"
              activeClassName= "active"
              className="nav-links"
              onClick={handleClick}
            >
              Vols
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink
              exact
              to= "/MyFlights"
              activeClassName= "active"
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
      </div>
    </nav>
  )
}


export default NavBar;