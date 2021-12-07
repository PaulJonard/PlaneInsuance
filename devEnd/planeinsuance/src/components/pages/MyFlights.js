import React, { Component } from "react";
import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight2 from './../FlightsDisplaying/Flight2.js'
import { getContract } from "../../utils/EtherUtil.js";
import { ethers } from "ethers";

class MyFlights extends Component{
  //Store les données émisent, et de façon asynchrone
  state = {
    data:[]
  }

  async getAllBoughtFlights(){
    try{
        const boardingPassContract = getContract();

        //Récupère le providerWeb3, Metamask ici
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        
        let allTokensId = await boardingPassContract.getAllTokensFromAdress(await provider.getSigner().getAddress());
        //Boucler sur les tokens que l'intéracteur de contrat disposent
        for ( var tokenId in allTokensId){
          //+1, car le tableau commence à l'index 1, mais dans Solidity, 0 n'existe pas et la donnée vient du SmartContract
          if (tokenId+1 !== 0){            
            let tokenUri = await boardingPassContract.getTokenURI(tokenId +1);//Récupère les datas au format Json
            let json = await (await fetch(tokenUri)).json();//Méthodes asynchrone pour récupèrer le json et le convertir en objet json
            
            //Définit le prix de remboursement en Ether, divisant le prix USD par le prix de l'ether, convertit en wei, puis renvoit que 75% du prix du billet
            json.data.ethPrice = ((json.data.price / (json.data.ethPrice/100000000))*0.75).toPrecision(3);
            
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