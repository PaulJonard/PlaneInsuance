import React, { Component } from "react";
import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight2 from './../FlightsDisplaying/Flight2.js'
import abi from './../../utils/BoardingPass.json'
import { ethers } from "ethers";

class MyFlights extends Component{
  state = {
    datas:[]
  }
  async getContract(){
    try{
      const contractAddress = "0xA237D2692AD62Dd7ca74913e8A463AF6dBc9166b";
      const contractABI = abi.abi;
      const { ethereum } = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
      } else{
        console.log("Ethereum object doesn't exist!")
      }
    } catch(error){
      console.log(error)
    }
  }  

  async getAllBoughtFlights(){
    try{
        const boardingPassContract = this.getContract();
        let allTokensId = await boardingPassContract.getAllTokensFromAdress(boardingPassContract.signer);
        for ( var tokenId in allTokensId){
          let tokenUri = await boardingPassContract.getTokenURI(tokenId);
          let json = await (await fetch(tokenUri)).json();
          this.state.datas.push(json);        
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