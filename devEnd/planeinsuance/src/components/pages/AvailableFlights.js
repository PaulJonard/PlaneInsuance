import React, {Component} from "react";

import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight from './../FlightsDisplaying/Flight.js'

import './AvailableFlights.css'

class AvailableFlights extends Component {
  state = {
    data: []
  }

  componentDidMount(){
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
        this.setState(result)      
    })
  }

  render() {
    return (
      <div className="bg-af">{(this.state.data[0]) ? <FlightsList component={this.state.data.map(_flight => <Flight flightData={_flight}/>)}/>  : <h1>Chargement...</h1>}</div>
    )
  }
}

export default AvailableFlights;