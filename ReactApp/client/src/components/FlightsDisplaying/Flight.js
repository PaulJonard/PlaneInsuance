import React from 'react'

function Flight({flightData}){
    return (
        <div>
            <div>
                <h1>{flightData.num}</h1>
                <div>
                    <h2>{flightData.boardingDate}</h2>
                    <span>{flightData.boardingTime}</span>
                    <span>{flightData.departure} - {flightData.destination}</span>
                </div>
            </div>
            <div>
                <input type="checkbox" value="Assurer"/>
                <h1>{flightData.price}</h1>
                <button>Acheter le billet</button>
            </div>
        </div>
    )    
}    

export default Flight