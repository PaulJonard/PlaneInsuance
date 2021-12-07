import abi from './../utils/BoardingPass.json'
import { ethers } from "ethers";

//Fichier exposant des fonctions utilitaires en rapport avec ethereum

export const ethToWei = (ethPrice) => {
  return ethers.utils.parseEther(ethPrice);
}

//Obtenir le contrat actuellement déployé
export const getContract = () => {
  try{
    //L'addresse du contrat, renvoyé au moment du deploiment par hardhat
    const contractAddress = "0x281777246Ffe8D7081D9A9934481bCa0b06B2c49";

    //Fichier construit dans artifacts/contracts/BoardingPass
    //Permets d'obtenir un bytecode du smartcontract, et d'exposer ses fonctions
    const contractABI = abi.abi;
    const { ethereum } = window;
    if(ethereum){
      //Attrape le web3 provider (metamask)
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

//Modifie la valeur booléen canceled d'un vol
export const updateFlightCanceledValue = (flightNum) => {
  try{
    const contractAddress = getContract();
    console.log(flightNum)
    contractAddress.updateAllTokensCanceledValueByNum(flightNum);

  } catch(error){
    console.log(error)
  }
}


export const isOwner = async() => {
  try{
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);

      const signerAddress = await provider.getSigner().getAddress();
      const deployerAddress = await getContract().owner();
      console.log(signerAddress)
      console.log(deployerAddress)
      return  signerAddress === deployerAddress ? true : false
  } catch(error){
      console.log(error)
  }
}