import React, { useState } from "react";
import styled from "@emotion/styled";
import Web3 from "web3";

// Mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

// Mui Icons
import AddIcon from "@mui/icons-material/Add";

// custom
import { CryptoIcon } from "../CryptoCoin";

// types
import { Address, Coin, isCoin, AddressObj, NewAddressObj } from "../../types";

const STextField = styled(TextField)`
  margin-top: 16px;
`;

const SDialogContent = styled(DialogContent)`
  overflow: initial;
  .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input {
    height: 23px;
  }
`;

const SMenuItemContainer = styled.div`
  display: inline-flex;
`;

type Props = {
  add: (input: NewAddressObj) => void;
  addresses: AddressObj[];
};

function AddAddress(props: Props): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [web3Validated, setWeb3Validated] = useState<boolean>(false);
  const [duplicateValidated, setDuplicateValidated] = useState<boolean>(false);
  const [coin, setCoin] = useState<Coin>("LINK");
  const [address, setAddress] = useState<Address>("");

  const handleClose: () => void = () => {
    setAddress("");
    setWeb3Validated(false);
    setDuplicateValidated(false);
    setOpen(false);
  };

  const handleCoinChange = (event: SelectChangeEvent<Coin>): void => {
    const value = event?.target?.value;
    if (isCoin(value)) {
      setCoin(value);
      duplicateValidate(value, address as Address);
    }
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const address = event?.target?.value;
    setAddress(address);
    setWeb3Validated(Web3.utils.isAddress(address));
    duplicateValidate(coin, address);
  };

  const duplicateValidate = (coin: Coin, address: Address): void => {
    if (
      props.addresses.findIndex(
        (elem) => elem.address === address && elem.coin === coin
      ) === -1
    ) {
      setDuplicateValidated(true);
    } else {
      setDuplicateValidated(false);
    }
  };

  return (
    <div className="AddressInput">
      <Button
        color="inherit"
        variant="outlined"
        onClick={() => {
          setOpen(!open);
        }}
        startIcon={<AddIcon />}
      >
        Add Address
      </Button>

      <Dialog onClose={handleClose} open={open} fullWidth>
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
              <MenuItem value={"LINK"}>
                <SMenuItemContainer>
                  <CryptoIcon className="LINK" />
                  ChainLink Token (LINK)
                </SMenuItemContainer>
              </MenuItem>
              <MenuItem value={"USDT"}>
                <SMenuItemContainer>
                  <CryptoIcon className="USDT" />
                  Tether USD (USDT)
                </SMenuItemContainer>
              </MenuItem>
              <MenuItem value={"DAI"}>
                <SMenuItemContainer>
                  <CryptoIcon className="DAI" />
                  Dai Stablecoin (DAI)
                </SMenuItemContainer>
              </MenuItem>
              <MenuItem value={"ETH"}>
                <SMenuItemContainer>
                  <CryptoIcon className="ETH" />
                  Ethereum (ETH)
                </SMenuItemContainer>
              </MenuItem>
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
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Tooltip
            title={
              !web3Validated
                ? "Token not valid"
                : !duplicateValidated
                ? "Duplicate token already added"
                : ""
            }
          >
            <span>
              <Button
                autoFocus
                onClick={() => {
                  props.add({ coin, address });
                  setOpen(false);
                }}
                startIcon={<AddIcon />}
                disabled={!web3Validated || !duplicateValidated}
              >
                Add
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAddress;
