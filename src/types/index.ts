// Application
export type Mode = "light" | "dark";

// Web3
const coin = ["ETH", "LINK", "USDT", "DAI"] as const;
export type Coin = typeof coin[number];
export const isCoin = (x: any): x is Coin => coin.includes(x);

export type Address = string;

export type Uuid = string;

export type NewAddressObj = {
  coin: Coin;
  address: Address;
};

export type AddressObj = {
  uuid: Uuid;
  coin: Coin;
  address: Address;
};

export type BalanceObj = { [key: string]: string };
