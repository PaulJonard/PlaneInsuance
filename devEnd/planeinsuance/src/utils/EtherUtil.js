import abi from './../utils/BoardingPass.json'
import { ethers } from "ethers";

export const ethToWei = (ethPrice) => {
  return ethers.utils.parseEther(ethPrice);
}

export const getContract = () => {
  try{
    const contractAddress = "0x77017C9756274836578A81Dc06eddc19B8886Ae5";
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