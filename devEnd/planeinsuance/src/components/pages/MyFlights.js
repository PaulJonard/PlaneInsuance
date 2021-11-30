import React, { Component } from "react";
import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight2 from './../FlightsDisplaying/Flight2.js'
import { getContract } from "../../utils/EtherUtil.js";

class MyFlights extends Component{
  state = {
    datas:[]
  }

  async getAllBoughtFlights(){
    try{
        const boardingPassContract = getContract();
        let allTokensId = await boardingPassContract.getAllTokensFromAdress();
        console.log(allTokensId);
        for ( var tokenId in allTokensId){
          console.log(tokenId)
          if (tokenId !== 0){
            let tokenUri = await boardingPassContract.getTokenURI(tokenId);
            let json = await (await fetch(tokenUri)).json();
            this.state.datas.push(json); 
          }       
        }
    } catch (error){
      console.log(error)
    }
  }

  componentDidMount(){
    this.getAllBoughtFlights();
  }

  render(){
    return (
      <div className="bg-af">{(this.state.datas[0]) ? <FlightsList component={this.state.datas.map(_flight => <Flight2 flightData={_flight}/>)}/>  : <h1>Aucun vols achetés</h1>}</div>
    )
  }  
}

export default MyFlights;