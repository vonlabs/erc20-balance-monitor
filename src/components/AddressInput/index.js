import React, { useState } from 'react';

// Mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

// Web3
import ERC20ABI from '../../shared/abi-erc20.json'
import contractAddress from '../../shared/contract-addresses'
import sampleWallet from '../../shared/sample-wallet-addresses'

const Web3 = require("web3");
const provider = process.env.REACT_APP_PROVIDER_URL + process.env.REACT_APP_API_KEY
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

function AddressInput() {
  const [open, setOpen] = useState(false);

  async function connect_eth() {
    try {
      Web3Client.eth.getBalance(sampleWallet.ETH, function (error, wei) {
        if (!error) {
            console.log('wei', wei)
            var balance = Web3Client.utils.fromWei(wei, 'ether');
            console.log('balance', balance)
        }
      });
    } catch (err) {
      console.warn('connect_eth', err)
    }
  }

  async function connect2_bat() {    
    const contract = new Web3Client.eth.Contract(ERC20ABI, contractAddress.USDT);

    async function getBalance() {
      const result = await contract.methods.balanceOf(sampleWallet.USDT).call();
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