// import React, { useState } from 'react';
// import { useSessionStorage } from 'react-use';
// import ReactDOM from 'react-dom/client';
//import { useDebounce } from 'use-debounce';
// import QRCode from 'react-qr-code';
// import Web3 from 'web3';
// import { http, parseEther } from 'viem'
// import { sepolia } from 'viem/chains';
// import { SigningStargateClient } from '@cosmjs/stargate';
// import { ethers } from 'ethers';
// import {
//   configureChains,
//   createConfig,
//   useAccount,
//   useConnect,
//   useDisconnect,
//   usePrepareSendTransaction,
//   useSendTransaction,
//   useSignMessage,
//   useWaitForTransaction,
//   WagmiConfig,
// } from 'wagmi';
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// import { alchemyProvider } from 'wagmi/providers/alchemy';

import Capsule, { Environment, DeniedSignatureResWithUrl } from '@usecapsule/web-sdk';
//import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
// import {CapsuleButton} from './library/modal/CapsuleModal';
//import {
//  CapsuleProtoSigner,
//  CapsuleEthersSigner,
//  createCapsuleViemClient,
//  CapsuleEIP1193Provider,
//  CapsuleConnector,
//  CapsuleWeb,
//} from './library';
import {
  CapsuleServer
} from './library';
import { CoreCapsule } from './library/CoreCapsule';
import { ConstructorOpts } from './library/Capsule';

// sample transaction params
const DEFAULT_TO_ADDRESS = '0x42c9a72c9dfcc92cae0de9510160cea2da27af91';
const DEFAULT_VALUE = '1000';
const DEFAULT_GAS_AMOUNT = '21000';
const DEFAULT_MAX_PRIORITY_FEE_PER_GAS = '1';
const DEFAULT_MAX_FEE_PER_GAS = '3';
const DEFAULT_NONCE = '0';
const API_KEY_WITH_PERMISSIONS = 'fdba16e45ba41e80185eb2c0195e89d4';
const API_KEY_WITH_BRANDING = '2f938ac0c48ef356050a79bd66042a23';

const ALCHEMY_SEPOLIA_PROVIDER = 'https://eth-sepolia.g.alchemy.com/v2/KfxK8ZFXw9mTUuJ7jt751xGJCa3r8noZ';
const WSS_ALCHEMY_SEPOLIA_PROVIDER = 'wss://eth-sepolia.g.alchemy.com/v2/HfT9dMNs3W0h1vJmiPZQ_APaFjPo-BF9';
// goerli chain id
const DEFAULT_CHAIN_ID = '11155111';
const DEFAULT_CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [] as any[],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const DEFAULT_SMART_CONTRACT_FUNCTION = 'store';
const DEFAULT_SMART_CONTRACT_ARGS = ['808'];
const COSMOS_TESTNET_RPC = 'rpc.sentry-01.theta-testnet.polypore.xyz';
const COSMOS_DEFAULT_TO_ADDRESS = 'cosmos1f3px9t4juk43cwufj7f9s64z3wj7xvyc0rexg6';


// tslint:disable:no-console
import express from "express";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", async ( req, res ) => {
    const capsule = new Capsule(Environment.BETA);
    const result = capsule.checkIfUserExists('0x42c9a72c9dfcc92cae0de9510160cea2da27af91');
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
