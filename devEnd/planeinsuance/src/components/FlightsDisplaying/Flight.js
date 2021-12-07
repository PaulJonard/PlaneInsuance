import React, { useEffect, useState} from 'react'
import './Flight.css'
import { getContract, ethToWei, updateFlightCanceledValue, isOwner } from './../../utils/EtherUtil.js'
const Flight = ({flightData}) => {
    const [_isOwner, _setIsOwner] = useState(false);
    //Fonction qui définit les propriétés nécessaire à la methode du smart Contract pour mint
    //Puis appelle cette dite méthode
    const mintNft = async () => {
        try{
            isOwner().then((res) => {console.log(res)})
            const boardingPassContract = getContract();
            await boardingPassContract.mint(
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

            window.location.reload(true);
        } catch (error){
            console.log(error)
        }
    }

    //Met à jour à la fois dans la db et dans le contrat la valeur booléenne canceled d'un vol
    const updateFlight = async() => {

        fetch('http://localhost:8080/api/flights/:'+ flightData.num,
        {
          headers: 
          { 
            'Content-Type': 'application/text' 
          },
          method: 'PUT'
        })

        updateFlightCanceledValue(flightData.num)
        window.location.reload(true);
    }

    useEffect(async() => {
        _setIsOwner(await isOwner())
    }, [])
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
                <button className="button-buy" onClick={mintNft} hidden={_isOwner}>Acheter</button>
                <button className="button-buy" onClick={updateFlight} hidden={!_isOwner}>Annuler un vol</button>
            </div>
        </div>
    )
}

export default Flight