// TODO: Move this part to global file (?)
const Web3 = require("web3");

async function isAddress(address) {
  return Web3.utils.isAddress(address)
}

export default isAddress;