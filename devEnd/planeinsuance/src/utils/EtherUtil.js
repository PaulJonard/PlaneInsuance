import abi from './../utils/BoardingPass.json'
import { ethers } from "ethers";

export const ethToWei = (ethPrice) => {
    return ethers.utils.parseEther(ethPrice);
}

export const getContract = () => {
    try{
      const contractAddress = "0x3e8b054a1929b318de2417070E9F12e7AeCc55c9";
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