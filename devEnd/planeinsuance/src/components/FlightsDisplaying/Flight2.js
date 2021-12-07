import React from 'react'
import './Flight.css'
import { getContract, ethToWei} from './../../utils/EtherUtil.js'

const Flight2 = ({flightData}) => {

    //Méthode de remboursement, fait appel à une API pour récupérer le prix actuel de l'ETH
    const refund = async () =>{
        try{
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum',
            {
            headers:
            {
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                let ethPrice = result[0].current_price;

                const boardingPassContract = getContract();
                if(flightData.canceled){
                    //Fait les conversions pour emettre au contract, la valeur en wei de remboursement 
                    boardingPassContract.refund(flightData.tokenId, ethToWei(((flightData.price/ethPrice)*0.75).toPrecision(3)))
                }else{
                    alert("Ce vol n'est pas annulé!")
                }                       
            });
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
                <button className="button-buy" onClick={refund} disabled={flightData.canceled === 0 ? true : false}>Se faire Rembourser</button>
            </div>
        </div>
    )    
}    

export default Flight2