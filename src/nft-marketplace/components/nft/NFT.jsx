/* eslint-disable import/first */
import { Buffer } from 'buffer'
global.Buffer = Buffer
import React, { useState, useEffect } from 'react'
import './nft.css'
import Web3 from 'web3'
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import bids4 from '../../assets/bids4.png'
import { Button, Text } from '@chakra-ui/react'

const DEFAULT_CONTRACT_ADDRESS = '0xc08c00e1aa97a18583dc1a72a7e9fb9ce56cfef5'
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
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const FAUCET_WALLET_ADDRESS = '0x0A9E4bfD69966F256D8d9E64F8aa96fd336e2e70'; // email is vinay+023@usecapsule.com
// 0x328690d91D405c14D8E4cD1306E2Ca192A17D32e
const FAUCET_WALLET_PRIVATE_KEY = '3482cff611e76ea3ad84276e644454ad4c74ad5848eb5d51c9fb60271ccdb469'


const NFT = ({ capsule }) => {

  const [txState, setTxState] = useState("not_sent");
  const [faucetState, setFaucetState] = useState('not_sent');
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(capsule.getWallets())

  useEffect(() => {
    const updateLoginStatus = async () => {
      const isLoggedIn = await capsule.isSessionActive();
      setLoggedIn(isLoggedIn);
    };

    updateLoginStatus();

    // Then call it every second
    const intervalId = setInterval(updateLoginStatus, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const link = `https://sepolia.etherscan.io/address/${Object.values(capsule.getWallets())?.[0]?.address}`
  const web3 = new Web3('https://sepolia.infura.io/v3/961364684c7346c080994baab1469ea8');

  async function createTransaction(
    toAddress,
    value,
    gasAmount,
    maxPriorityFeePerGas,
    maxFeePerGas,
    nonce,
    chainId,
    contractAbi,
    functionName,
    functionArgs,
    deployByteCode,
  ) {
    let functionCallData;
    if (functionName && contractAbi) {
      const contract = new web3.eth.Contract(JSON.parse(contractAbi), toAddress);
      functionCallData = contract.methods[functionName](...functionArgs).encodeABI();
    }

    const tx = new FeeMarketEIP1559Transaction({
      to: !deployByteCode ? toAddress : undefined,
      value: value ? web3.utils.toHex(web3.utils.toWei(value, 'gwei')) : undefined,
      gasLimit: web3.utils.toHex(Number(gasAmount)),
      maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei(maxPriorityFeePerGas, 'gwei')),
      maxFeePerGas: web3.utils.toHex(web3.utils.toWei(maxFeePerGas, 'gwei')),
      nonce: web3.utils.toHex(Number(nonce)),
      data: functionCallData || deployByteCode || undefined,
      chainId: web3.utils.toHex(chainId),
      type: '0x02',
    });
    return tx.serialize().toString('base64');
  }

  async function sendTx() {
    if (!loggedIn) {
      await capsule.refreshSession(true)
    }

    const walletId = capsule.getWallets()?.[Object.keys(capsule.getWallets())[0]]?.id;

    const nonce = await web3.eth.getTransactionCount(Object.values(capsule.getWallets())[0].address);
    const tx = await createTransaction(
      DEFAULT_CONTRACT_ADDRESS,
      "0",
      "140000",
      '1',
      '3',
      nonce.toString(),
      DEFAULT_CHAIN_ID,
      JSON.stringify(DEFAULT_CONTRACT_ABI),
      'store',
      ['808'],
      '',
    );
    const res = await capsule.sendTransaction(walletId, tx, `${DEFAULT_CHAIN_ID}`);
    console.log(res);
  }

  async function faucet(toAddress) {
    // the amount to send
    const amountToSend = web3.utils.toWei('0.0003', 'ether'); // Update the value as needed

    const count = await web3.eth.getTransactionCount(FAUCET_WALLET_ADDRESS);
    console.log(count)
    const gasPrice = web3.utils.toWei('0.00003', 'gwei');

    const txObject = {
      nonce: web3.utils.toHex(count),
      to: toAddress,
      value: web3.utils.toHex(amountToSend),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(gasPrice)
    };
    console.log(txObject)

    const signedTx = await web3.eth.accounts.signTransaction(txObject, FAUCET_WALLET_PRIVATE_KEY);
    console.log(signedTx)

    try {
      const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(result);
    } catch (e) {
      console.log(e)
    }
  }


  if (!loggedIn) {
    return null;
  }

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>Check out this NFT!</h1>
        </div>
        <div className="bids-container-card">
          <div className="card-column" >
            <div className="bids-card">
              <div className="bids-card-top">
                {loggedIn === true ? <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  {(txState === "sent" || faucetState === 'sent') && (<div className="item-content-detail">
                    <p>Track your {txState === 'sent' && <>Minted NFT</>}{faucetState === 'sent' && <>Wallet Funded!</>} <a target='_blank' href={link} rel="noreferrer">here</a></p>
                  </div>)}
                  <Button
                    width="150px"
                    height="50px"
                    backgroundColor={'orange'}
                    color={'white'}
                    onClick={
                      async () => {
                        if (faucetState === 'not_sent') {
                          setFaucetState('init')
                          setTxState('not_sent')
                          console.log("Before")
                          await faucet(Object.values(capsule.getWallets())[0].address)
                          console.log("After")
                          setFaucetState('sent')
                        }
                      }
                    }
                  >
                    <Text
                      marginBottom={12}
                    >
                      {{
                        "not_sent": `Faucet`,
                        "init": "Pending...",
                        "sent": "Wallet Funded!",
                      }[txState]}
                    </Text>
                  </Button>
                  <Button
                    width="150px"
                    height="50px"
                    backgroundColor={'orange'}
                    color={'white'}
                    onClick={
                      async () => {
                        if (txState === 'not_sent') {
                          setTxState("init");
                          setFaucetState('not_sent');
                          await sendTx()
                          setTxState("sent");
                        }
                      }
                    }
                  >
                    <Text
                      marginBottom={12}
                    >
                      {{
                        "not_sent": `Mint NFT!`,
                        "init": "Pending...",
                        "sent": "Bought!",
                      }[txState]}
                    </Text>
                  </Button>
                </div>
                  : null
                }
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                  <p style={{ fontSize: '2em' }}>Abstract Pattern</p>
                </div>
                <img src={bids4} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFT
