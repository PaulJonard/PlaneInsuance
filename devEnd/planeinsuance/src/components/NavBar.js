import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const click = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  
  const connectWallet = async () => {
    try{      
      if(provider !== null){
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        console.log(signer);
        console.log("Connected", await signer.getAddress());
        setCurrentAccount(await signer.getAddress());
      }else{
        alert("Get Metamask!")
        return;
      } 

    } catch(error){
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {      
      console.log(provider)
      if (provider !== null) {
        connectWallet();         
      } else {
        console.log("Make sure you have metamask!");
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