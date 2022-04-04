import React, { useState, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

// mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// mui icons
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

// custom
import AddAddress from "./components/AddAddress";
import Table from "./components/Table";

// shared
import getBalance from "./shared/getBalance";

// types
import {
  Address,
  Coin,
  Uuid,
  Theme,
  AddressObj,
  NewAddressObj,
  BalanceObj,
} from "./types";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  width: 100vw;
  min-width: 244px;
  padding-top: 64px;
  --divider: rgba(224, 224, 224, 1);
  &.dark-mode {
    background-color: rgb(30, 30, 30);
    --divider: rgba(81, 81, 81, 1);
  }
`;

const SToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

// LocalStorage
const getAddressesFromLocalStorage = localStorage.addresses
  ? JSON.parse(localStorage.addresses)
  : [];

const getThemeFromLocalStorage = localStorage.theme
  ? localStorage.theme
  : "dark";

// Consts
const REFRESH_INTERVAL = 20; //secons

function App(): JSX.Element {
  const [addresses, setAddresses] = useState<AddressObj[]>(
    getAddressesFromLocalStorage
  );
  const [balances, setBalances] = useState<BalanceObj>({});
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage);

  useEffect(() => {
    async function updateBalances(addresses: AddressObj[]): Promise<void> {
      let temp: BalanceObj = Object.assign({}, balances, {});
      for (let i = 0; i < addresses.length; i++) {
        let balance = await getBalance(addresses[i].coin, addresses[i].address);
        temp[addresses[i].uuid] = balance;
      }
      setBalances(temp);
    }

    updateBalances(addresses);
    const interval = setInterval(() => {
      updateBalances(addresses);
    }, REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: (): void => {
        setTheme((prevTheme) => {
          if (prevTheme === "light") {
            localStorage.setItem("theme", "dark");
            return "dark";
          } else {
            localStorage.setItem("theme", "light");
            return "light";
          }
        });
      },
    }),
    []
  );

  const themeMui = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  );

  const addAddress = (input: NewAddressObj): void => {
    let uuid = uuidv4();
    let temp = [...addresses, { uuid, ...input }];
    setAddresses(temp);
    localStorage.setItem("addresses", JSON.stringify(temp));
    updateBalance(input.coin, input.address, uuid);
  };

  const removeAddress = (uuid: Uuid): void => {
    let temp = JSON.parse(JSON.stringify(addresses)); //fastest way of copying an Array like this one
    temp = temp.filter((item: AddressObj) => item.uuid !== uuid);
    setAddresses(temp);
    localStorage.setItem("addresses", JSON.stringify(temp));
  };

  async function updateBalance(
    coin: Coin,
    address: Address,
    uuid: Uuid
  ): Promise<void> {
    let temp = Object.assign({}, balances, {});
    let balance = await getBalance(coin, address);
    temp[uuid] = balance;
    setBalances(temp);
  }

  return (
    <ThemeProvider theme={themeMui}>
      <AppContainer className={`App ${theme}-mode`}>
        <AppBar>
          <SToolbar>
            <AddAddress add={addAddress} addresses={addresses} />
            <IconButton 
              id="theme-change-btn"
              onClick={colorMode.toggleColorMode} 
              color="inherit"
            >
              {themeMui.palette.mode === "dark" ? (
                <WbSunnyIcon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </SToolbar>
        </AppBar>
        <Table
          addresses={addresses}
          balances={balances}
          removeAddress={removeAddress}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
