import React from 'react'
import './Flight.css'

function Flight({flightData}){
    return (
        <div className="container-flight">
            <div id="infos" className="sub-container">
                <div className="span-text">{flightData.num}</div>
                <div>
                    <div className="span-text">Départ :</div>
                    <div className="span-text">{flightData.departure}</div>
                    <div className="divider"/>
                    <div className="span-text">{flightData.boardingDate}</div>
                    <div className="span-text">{flightData.boardingTime}</div>
                </div>
                <div>
                    <div className="span-text">Arrivée :</div>
                    <div className="span-text">{flightData.destination}</div>
                </div>
            </div>
            <div id="buy" className="sub-container">
                <div className="span-text">{flightData.price}</div>
                <button className="button-buy">Acheter</button>
            </div>
        </div>
    )    
}    

export default Flight