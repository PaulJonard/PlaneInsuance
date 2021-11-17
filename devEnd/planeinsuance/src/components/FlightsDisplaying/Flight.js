import React from 'react'
import './Flight.css'
import {pinJSONToIPFS} from './../../utils/IPFS.js'

const Flight = ({flightData}) => {

    const mintNft = async () =>{

        const contractFactory = await hre.ethers.getContractFactory("BoardingPass");
        const contract = await contractFactory.attach("0xc9D95273339ECEBD3E04D9a473C7abb1FBC7B35E");

        let CID = pinJSONToIPFS(flightData);
        let txn;
        txn = await contract.mint(CID, flightData.ethPrice)
        await txn.wait();
    }

    return (
        <div className="container-flight">
            <div id="infos" className="sub-container">
                <div className="span-text">{flightData.num}</div>
                <div id="departure">
                    <div className="span-text">Départ : &emsp; {flightData.departure}</div>
                    <div className="span-text">{flightData.boardingDate} &emsp; {flightData.boardingTime}</div>
                </div>
                <div id="destination">
                    <div className="span-text">Arrivée : &emsp; {flightData.destination}</div>
                </div>
            </div>
            <div id="buy" className="sub-container">
                <div className="span-text">Prix : &emsp; {flightData.price} €</div>
                <div className="span-text">{flightData.ethPrice} &nbsp; Ξ</div>
                <button className="button-buy" onClick={mintNft}>Acheter</button>
            </div>
        </div>
    )    
}    

export default Flight