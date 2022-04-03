
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Web3 from 'web3'

// Mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// Mui Icons
import AddIcon from '@mui/icons-material/Add';

// custom
import { CryptoIcon } from '../CryptoCoin';


const SButton = styled(Button)`
`

const SDialog = styled(Dialog)`
`

const STextField = styled(TextField)`
  margin-top: 16px;
`

const SDialogContent = styled(DialogContent)`
  overflow: initial;
  .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input {
    height: 23px;
  }
`

const SMenuItemContainer = styled.div`
  display: inline-flex;
`

function AddressInput(props) {
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [coin, setCoin] = useState('LINK');
  const [address, setAddress] = useState('');

  const handleClose = () => {
    setAddress('');
    setValidated(false);
    setOpen(false);
  };


  const handleCoinChange = (event) => {
    setCoin(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setValidated(Web3.utils.isAddress(event.target.value))
  };

  return (
    <div className="AddressInput">
      <SButton
        color="inherit"
        variant="outlined"
        onClick={()=>{
          setOpen(!open);
        }}
        startIcon={<AddIcon/>}
      >
        Add Address
      </SButton>

      <SDialog 
        onClose={handleClose} 
        open={open}
        fullWidth
      >
        <DialogTitle>Input Address</DialogTitle>
        <SDialogContent>
          <FormControl fullWidth>
            <InputLabel id="coin-select-label">Coin</InputLabel>
            <Select
              labelId="coin-select-label"
              id="coin-select"
              value={coin}
              label="Coin"
              onChange={handleCoinChange}
            >
              <MenuItem value={'LINK'}><SMenuItemContainer><CryptoIcon className="LINK"/>ChainLink Token (LINK)</SMenuItemContainer></MenuItem>
              <MenuItem value={'USDT'}><SMenuItemContainer><CryptoIcon className="USDT"/>Tether USD (USDT)</SMenuItemContainer></MenuItem>
              <MenuItem value={'DAI'}><SMenuItemContainer><CryptoIcon className="DAI"/>Dai Stablecoin (DAI)</SMenuItemContainer></MenuItem>
              <MenuItem value={'ETH'}><SMenuItemContainer><CryptoIcon className="ETH"/>Ethereum (ETH)</SMenuItemContainer></MenuItem>
            </Select>
          </FormControl>
          <STextField 
            id="wallet-address-input" 
            label="Wallet Address" 
            variant="outlined" 
            fullWidth
            value={address}
            onChange={handleAddressChange}
          />
        </SDialogContent>
        <DialogActions>
          <Button 
            autoFocus
            onClick={handleClose}
          >
            Close
          </Button>
          <Button 
            autoFocus
            onClick={()=>{
              props.add({coin, address})
              setOpen(false)
            }}
            startIcon={<AddIcon/>}
            disabled={!validated}
          >
            Add
          </Button>
        </DialogActions>
      </SDialog>
    </div>
  );
}

export default AddressInput;
