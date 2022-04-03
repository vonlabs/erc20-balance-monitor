
import React, { useState } from 'react';
import styled from '@emotion/styled';

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

const SButton = styled(Button)`
`

const SDialog = styled(Dialog)`
`

const STextField = styled(TextField)`
  margin-top: 16px;
`

const SDialogContent = styled(DialogContent)`
  overflow: initial;
`


function AddressInput(props) {
  const [open, setOpen] = useState(false);
  const [coin, setCoin] = useState('LINK');
  const [address, setAddress] = useState('');


  const handleCoinChange = (event) => {
    setCoin(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
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
        onClose={()=>{setOpen(false)}} 
        open={open}
        fullWidth
      >
        <DialogTitle>Input Addresses</DialogTitle>
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
              <MenuItem value={'LINK'}>ChainLink Token (LINK)</MenuItem>
              <MenuItem value={'USDT'}>Tether USD (USDT)</MenuItem>
              <MenuItem value={'DAI'}>Dai Stablecoin (DAI)</MenuItem>
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
            onClick={()=>{setOpen(false)}}
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
            disabled={address.length === 0}
          >
            Add
          </Button>
        </DialogActions>
      </SDialog>
    </div>
  );
}

export default AddressInput;
