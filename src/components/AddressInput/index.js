import React, { useState } from 'react';

// Mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

// Web3
import ERC20ABI from '../../shared/abi-erc20.json'
import contractAddress from '../../shared/contract-addresses'

const Web3 = require("web3");
const provider = process.env.REACT_APP_PROVIDER_URL + process.env.REACT_APP_API_KEY
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

function AddressInput() {
  const [open, setOpen] = useState(false);

  async function connect_eth() {
    const address_ETH = '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1' //ETH

    try {
      Web3Client.eth.getBalance(address_ETH, function (error, wei) {
        if (!error) {
            console.log('wei', wei)
            var balance = Web3Client.utils.fromWei(wei, 'ether');
            console.log('balance', balance)
        }
      });
    } catch (err) {
      console.warn('balance', err)
    }
  }

  async function connect2_bat() {    
    const walletAddress_BAT = '0x7bc027cfe825dfbcca64d2cef63c61f1a689ef98'

    const contract = new Web3Client.eth.Contract(ERC20ABI, contractAddress.BAT);

    async function getBalance() {
      const result = await contract.methods.balanceOf(walletAddress_BAT).call();
      const format = Web3Client.utils.fromWei(result);
      console.log(result, format);
    }

    getBalance();
  }


  return (
    <div className="AddressInput">
      <Button
        variant="outlined"
        onClick={()=>{
     //     setOpen(!open);
          connect_eth();
        }}
      >
        ETH
      </Button>
      <Button
        variant="outlined"
        onClick={()=>{
          connect2_bat();
        }}
      >
        USDT 
      </Button>

      <Dialog 
        onClose={()=>{setOpen(false)}} 
        open={open}
      >
        <DialogTitle>Input Addresses</DialogTitle>
      </Dialog>
    </div>
  );
}

export default AddressInput;
