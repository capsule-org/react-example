import { Environment } from "@usecapsule/web-sdk";

export const ENV = process.env.REACT_APP_ENV
  ? (process.env.REACT_APP_ENV.toUpperCase() as Environment)
  : Environment.SANDBOX;

export const isProd = ENV === Environment.PROD;

export const MINTER_CONTRACT_ADDRESS =
  "0x00005ea00ac477b1030ce78506496e8c2de24bf5";
export const DEFAULT_CHAIN_ID = "11155111";
export const MINT_PRICE = "0";
export const MINTER_FEE_RECIPIENT =
  "0x0000a26b00c1F0DF003000390027140000fAa719";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MINTER_IF_NOT_PAYER = ZERO_ADDRESS;
export const MINTER_QUANTITY = "1";

export const SANDBOX_NFT_CONTRACT_ADDRESS =
  "0xdAfB9d117B585E406A74E84977Fa82DdEE8B0a32";
export const PROD_NFT_CONTRACT_ADDRESS =
  "0x68065f2a65c3b01c65eb1d31042ed77f2e7ec728";

export const NFT_CONTRACT_ADDRESS = isProd
  ? PROD_NFT_CONTRACT_ADDRESS
  : SANDBOX_NFT_CONTRACT_ADDRESS;

export const INFURA_HOST =
  "https://sepolia.infura.io/v3/961364684c7346c080994baab1469ea8";
