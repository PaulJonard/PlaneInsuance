import React from "react";
import './Home.css';
import metamaskLogo from './../../misc/metamask.png'

export const Home = () => {
  return (
    <div>
        <div className="section cc-store-home-wrap">
          <div className="intro-header">
            <div className="intro-content cc-homepage">
              <div className="intro-text">
                <div className="heading-jumbo">Plane insuance</div>
                <div className="paragraphe-bigger cc-bigger-white-light">
                  "Une petite phrase en dessous"
                  <br/>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="motto-wrap">
              <div className="label cc-light">Petite phrase là</div>
              <div className="heading-jumbo-small">
                "pouet pouet pouet"
                <br/>
              </div>
            </div>
            <div className="divider"/>
            <div className="home-content-wrap">
              <div className="w-layout-grid about-grid">
                <div id="w-node-1">
                  <div className="home-section-wrap">
                    <div className="label cc-light">How to use</div>
                    <h2 className="section-heading">Config Metamask</h2>
                    <p className="paragraphe-light">
                      Nulla vel sodales tellus, quis condimentum enim. 
                      Nunc porttitor venenatis feugiat.
                      Etiam quis faucibus erat, non accumsan leo.
                      Aliquam erat volutpat. Vestibulum ac faucibus eros. 
                      Cras ullamcorper gravida tellus ut consequat.
                    </p>
                  </div>
                  <a href="https://metamask.io/" className="button w-inline-block">
                    <div>Install Metamask</div>
                  </a>
                </div>
                <img src={metamaskLogo} id="w-node-1"></img>
              </div>
              <div className="w-layout-grid about-grid cc-about-2">
                <div id="w-node-2">
                  <div className="home-section-wrap">
                    <div className="label cc-light">TrucMuch</div>
                    <h2 className="section-heading">Tructruc</h2>
                    <p className="paragraphe-light">
                      Bla bla bla bbbbllaa
                    </p>
                  </div>
                  <a href="https://metamask.io/" className="button w-inline-block">
                    <div>Install Metamask</div>
                  </a>
                </div>
                <img src={metamaskLogo} id="w-node-2"></img>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};