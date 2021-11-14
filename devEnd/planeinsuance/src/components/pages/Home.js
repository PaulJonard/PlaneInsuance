import React from "react";
import './Home.css';
import './Ether.css';
import MetamaskLogo from "../../utils/MetamaskLogo";

const Home = () =>{ 
  return (    
    <div className="bg">      
        <div className="section cc-store-home-wrap">
          <div className="intro-header">
            <div className="intro-content cc-homepage">
              <div className="intro-text">
                <div className="heading">Plane insuance</div>
                <div className="paragraphe-bigger cc-bigger-white-light">
                  Une application de réservation de vol, couplée à une assurance décentralisée pour des remboursements sans contraintes, rapide et sûr
                  <br/>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="motto-wrap">
              <div className="label cc-light">Getting started</div>
              <div className="heading-small">
                Nous allons voir étape par étape, comment utiliser l'application.<br/><br/>
                De la création d'un wallet Web3<br/>
                En passant par l'achat d'un billet<br/>
                Et en terminant par un remboursement si nécessaire!<br/><br/>
                Votre aventure dans le nouveau web, commence ici!<br/>
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
                      Metamask est un portefeuille multicomptes qui vie au sein de votre navigateur.<br/>
                      Il est le point d'entrée pour un nouveau web, un web décentralisée, le Web3.<br/>
                      Il supporte toutes les blockchains et tokens existants, il sera nécessaire pour accéder à notre site.
                    </p>
                  </div>
                  <a href="https://metamask.io/" className="button w-inline-block" target="_blank" rel="noreferrer">
                    <div>Install Metamask</div>
                  </a>
                </div>
                <MetamaskLogo/>
              </div>
              <div className="w-layout-grid about-grid cc-about-2">
                <div id="space">
                    <div className="elogo">
                          <div className="trif u1"></div>
                          <div className="trif u2"></div>
                          <div className="trif u3"></div>
                          <div className="trif u4"></div>
                          <div className="ct"></div>
                          <div className="trif l1"></div>
                          <div className="trif l4"></div>
                      </div>
                    <h1>ethereum</h1>
                  </div>                
                <div id="w-node-2">
                  <div className="home-section-wrap">
                    <div className="label cc-light">Get some ETH</div>
                    <h2 className="section-heading">The Faucet</h2>
                    <p className="paragraphe-light">
                      Notre application vie au sein du réseau Rinkeby, c'est un réseau de test du réseau principal Ethereum.<br/>
                      Pour payer vos billets, et les frais de blockchain, du token ETH vous sera nécessaire.<br/>
                      Sur Rinkeby, nous utilisons du faux ETH, vous pouvez en obtenir via un Faucet.
                    </p>
                  </div>  
                  <a href="https://faucet.rinkeby.io/" className="button w-inline-block" target="_blank" rel="noreferrer">
                    <div>Give me my ETH  !!!</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="blog-heading">
              <div className="label cc-light">About Us</div>
              <h2 className="work-heading">Company news</h2>
            </div>
            <div className="collection-list-wrapper">
              <div role="list" className="collection-wrap">
                <div role="listitem" className="blog-preview-wrap">
                  <span className="business-article-heading">Réservez un vol !</span>
                  <p className="paragraphe-light">
                    Bla bla bla A venir
                  </p>
                </div>
                <div role="listitem" className="blog-preview-wrap">
                  <span className="business-article-heading">Un billet sous forme de NFT !</span>
                  <p className="paragraphe-light">
                    Bla bla bla A venir
                  </p>
                </div>
                <div role="listitem" className="blog-preview-wrap">
                  <span className="business-article-heading">Faites marcher l'assurance !</span>
                  <p className="paragraphe-light">
                    Bla bla bla A venir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )  
};

export default Home;