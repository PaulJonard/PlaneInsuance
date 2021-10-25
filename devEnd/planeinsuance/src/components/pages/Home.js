import React from "react";
import './Home.css';
import metamaskLogo from './../../misc/metamask.png'
import ethFaucet from './../../misc/ethFauchet.jpeg'

export const Home = () => {
  return (
    <div>
        <div className="section cc-store-home-wrap">
          <div className="intro-header">
            <div className="intro-content cc-homepage">
              <div className="intro-text">
                <div className="heading">Plane insuance</div>
                <div className="paragraphe-bigger cc-bigger-white-light">
                  "Une application de réservation de vol, couplée à une assurance décentralisée pour des remboursements sans contraintes, rapide et sûr"
                  <br/>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="motto-wrap">
              <div className="label cc-light">Getting started</div>
              <div className="heading-small">
                " zzzzzz"
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
                      Metamask est un portefeuille multicomptes qui vie au sein de votre navigateur.
                      Il est le point d'entrée pour un nouveau web, un web décentralisée, le Web3.
                      Il supporte toutes les blockchains et tokens existants, il sera nécessaire pour accéder à notre site.
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
                    <div className="label cc-light">Get some ETH</div>
                    <h2 className="section-heading">The Faucet</h2>
                    <p className="paragraphe-light">
                      Notre application vie au sein du réseau Rinkeby, c'est un réseau de test du réseau principal Ethereum.
                      Pour payer vos billets, et les frais de blockchain, du token ETH vous sera nécessaire.
                      Sur Rinkeby, nous utilisons du faux ETH, vous pouvez en obtenir via un Faucet.
                    </p>
                  </div>
                  <a href="https://faucet.rinkeby.io/" className="button w-inline-block">
                    <div>Give me my ETH!!</div>
                  </a>
                </div>
                <img src={ethFaucet} id="w-node-2"></img>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
