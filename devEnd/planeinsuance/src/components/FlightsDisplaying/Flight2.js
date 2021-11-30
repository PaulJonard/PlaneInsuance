import React from 'react'
import './Flight.css'
import { getContract} from './../../utils/EtherUtil.js'

const Flight2 = ({flightData}) => {

    const refund = async () =>{
        try{
            const boardingPassContract = getContract();
            console.log(flightData.tokenId)
            let txn = await boardingPassContract.refund(flightData.tokenId)
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
                <div className="span-text">Prix : &emsp; {flightData.price} €</div>
                <div className="span-text">{flightData.ethPrice} &nbsp; Ξ</div>
                <button className="button-buy" onClick={refund}>Se faire Rembourser</button>
            </div>
        </div>
    )    
}    

export default Flight2