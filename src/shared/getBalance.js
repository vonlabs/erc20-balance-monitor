// Web3
import ERC20ABI from './abi-erc20.json'
import contractAddress from './contract-addresses'


// TODO: Move this part to global file (?)
const Web3 = require("web3");
const provider = process.env.REACT_APP_PROVIDER_URL + process.env.REACT_APP_API_KEY
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));


//TODO: Add Error Hadling
async function getBalance(coin, address) {
  async function get_eth() {
    try {
      let wei = await Web3Client.eth.getBalance(address);
      let balance = Web3Client.utils.fromWei(wei, 'ether');
      return balance;
    } catch (err) {
      console.warn(err);
    }
  }

  async function get_erc20() {    
    try {
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
  } else {
    return await get_erc20();
  }

}

export default getBalance;