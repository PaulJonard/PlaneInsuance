import React, { Component } from "react";
import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight2 from './../FlightsDisplaying/Flight2.js'
import { getContract } from "../../utils/EtherUtil.js";
import { ethers } from "ethers";

class MyFlights extends Component{
  state = {
    data:[]
  }

  async getAllBoughtFlights(){
    try{
        const boardingPassContract = getContract();

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        
        let allTokensId = await boardingPassContract.getAllTokensFromAdress(await provider.getSigner().getAddress());
        console.log(allTokensId);
        for ( var tokenId in allTokensId){
          if (tokenId !== 0){
            let tokenUri = await boardingPassContract.getTokenURI(tokenId +1);
            let json = await (await fetch(tokenUri)).json();    
            
            json.data.ethPrice = ((json.data.price / (json.data.ethPrice/100000000))*0.75).toPrecision(2);
            
            this.state.data.push(json.data); 
            this.setState(json.data);            
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
      <div className="bg-af">{(this.state.data.length > 0) ? <FlightsList component={this.state.data.map(_flight => <Flight2 flightData={_flight}/>)}/>  : <h1>Aucun vols achetés</h1>}</div>
    )
  }  
}

export default MyFlights;