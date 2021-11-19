import React from 'react'
import './Flight.css'
import {pinJSONToIPFS} from './../../utils/IPFS.js'
import abi from './../../utils/BoardingPass.json'
import { ethers } from "ethers";

const Flight = ({flightData}) => {
    
    const getContract = () => {
        try{
          const contractAddress = "0x7F7253Db09175ab15Dea4536D2a8Ddf083BD9719";
          const contractABI = abi.abi;
          const { ethereum } = window;
          if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            return new ethers.Contract(contractAddress, contractABI, signer);
          } else{
            console.log("Ethereum object doesn't exist!")
          }
        } catch(error){
            console.log(error)
        }
    }

    const mintNft = async () =>{
        try{
            const boardingPassContract = getContract();
            console.log(boardingPassContract)
            let CID = pinJSONToIPFS(flightData);
            let txn = await boardingPassContract.mint(CID, /*flightData.ethPrice*/)
            console.log(txn.hash)
        } catch (error){
            console.log(error)
        }
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