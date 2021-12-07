import React, {Component} from "react";

import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight from './../FlightsDisplaying/Flight.js'

import './AvailableFlights.css'

class AvailableFlights extends Component {
  state = {
    data: []
  }
  //Méthode exposé de react, evenement qui se déclenche au chargement du composant
  componentDidMount(){
    let ethPrice = 0
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum',  //Fetch le fichier json envoyé par l'API coinGecko, usd to eth
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
        ethPrice = result[0].current_price

      fetch('http://localhost:8080/api/flights/', //Fetch tout les vols disponibles
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
        //set la propriété ethPrice de chaque vol récupéré
        result.data.map(row => row.ethPrice = (row.price / ethPrice).toPrecision(3))
        this.setState(result)
      })
    })
  }

  render() {
    return (
      <div className="bg-af">{(this.state.data[0]) ? <FlightsList component={this.state.data.map(_flight => <Flight flightData={_flight}/>)}/>  : <h1>Chargement...</h1>}</div>
    )
  }
}

export default AvailableFlights;