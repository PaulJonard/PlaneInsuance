import React from 'react'
import './Flight.css'
import { getContract, ethToWei } from './../../utils/EtherUtil.js'
const Flight = ({flightData}) => {

    const mintNft = async () =>{
        try{
            const boardingPassContract = getContract();
            let txn = await boardingPassContract.mint(
                flightData.num,
                flightData.departure,
                flightData.destination,
                flightData.boardingDate,
                flightData.boardingTime,
                flightData.canceled,
                flightData.price,
                ethToWei(flightData.ethPrice).toString(),
                {value : ethToWei(flightData.ethPrice)}
            )
            
            console.log(txn)
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
                <div className="span-text">Prix : &emsp; {flightData.price} $</div>
                <div className="span-text">{flightData.ethPrice} &nbsp; Ξ</div>
                <button className="button-buy" onClick={mintNft}>Acheter</button>
            </div>
        </div>
    )
}

export default Flight