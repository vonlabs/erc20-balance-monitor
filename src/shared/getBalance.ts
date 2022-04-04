// Web3
import ERC20ABI from './abi-erc20.json'
import contractAddress from './contract-addresses'

// types
import { Address, Coin, isCoin } from '../types'
declare var process : {
  env: {
    REACT_APP_PROVIDER_URL: string,
    REACT_APP_API_KEY: string,
  }
}

// TODO: Move this part to global file (?)
const Web3 = require("web3");
const provider = process.env.REACT_APP_PROVIDER_URL + process.env.REACT_APP_API_KEY
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));


//TODO: Add Error Hadling
async function getBalance(coin: Coin, address: Address):Promise<string> {
  async function get_eth() {
    try {
      const wei = await Web3Client.eth.getBalance(address);
      const balance = Web3Client.utils.fromWei(wei, 'ether');
      return balance;
    } catch (err) {
      console.warn(err);
    }
  }

  async function get_erc20() {    
    try {
      if (coin === 'ETH') throw new Error("Impossible to get ETH here");
      const contract = new Web3Client.eth.Contract(ERC20ABI, contractAddress[coin]);
      const result = await contract.methods.balanceOf(address).call();
      const formated = Web3Client.utils.fromWei(result);
      return formated;
    } catch (err) {
      console.warn(err);
    }
  }

  if(coin === 'ETH') {
    return await get_eth();
  } else if (isCoin(coin)) {
    return await get_erc20();
  } else {
    throw new Error("Unsupported Coin Selected. TypeScript should have prevented it.");
  }

}

export default getBalance;