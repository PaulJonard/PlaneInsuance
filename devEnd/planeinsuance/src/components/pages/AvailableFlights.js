import React, {Component} from "react";

import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight from './../FlightsDisplaying/Flight.js'

import './AvailableFlights.css'

class AvailableFlights extends Component {
  state = {
    data: []
  }
  componentDidMount(){
    let ethPrice = 0
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=ethereum',
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

      fetch('http://localhost:8080/api/flights',
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
        result.data.map(row => row.ethPrice = (row.price / ethPrice).toPrecision(2))
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