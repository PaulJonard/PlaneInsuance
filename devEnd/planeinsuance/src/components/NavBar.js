import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const click = useState(false);
  
  const connectWallet = async () => {
    try{
      const { ethereum} = window
      if(!ethereum){
        alert("Get Metamask!")
        return;
      } 
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch(error){
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {      
      const { ethereum} = window
      if (!ethereum) {
        console.log("Make sure you have metamask!");        
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
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
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              hidden={!currentAccount}
              exact
              to= "/AvailableFlights"
              activeClassName= "active"
              className="nav-links"
            >
              Vols
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink
              hidden={!currentAccount}
              exact
              to= "/MyFlights"
              activeClassName= "active"
              className="nav-links"
            >
              Mes vols
            </NavLink>
          </li>
          <li className="nav-item">
            {!currentAccount ?               
              <button className="connectButton" onClick={connectWallet}>
                Connect Wallet
              </button>
              :
              <span className="address">{currentAccount}</span>}
          </li>
        </ul>
      </div>
    </nav>
  )
}


export default NavBar;