/* eslint-disable import/first */
import { Buffer } from 'buffer'
global.Buffer = Buffer
import React, { useState, useEffect } from 'react'
import './nft.css'
import Web3 from 'web3'
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import bids4 from '../../assets/wordmark_white.png'
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
const FAUCET_WALLET_ADDRESS = '0x328690d91D405c14D8E4cD1306E2Ca192A17D32e';
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

    const txObject = {
      nonce: web3.utils.toHex(await web3.eth.getTransactionCount(FAUCET_WALLET_ADDRESS)),
      to: toAddress,
      value: web3.utils.toHex(web3.utils.toWei('0.0005', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('0.00004', 'gwei'))
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObject, FAUCET_WALLET_PRIVATE_KEY);

    const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(result)

    setFaucetState("sent");
  }

  return (
    <>
      {loggedIn && <div className='bids section__padding nft-center-button'>
        <div className="bids-container">
          <div className='instruction-style'>Instructions</div>
          <div className="bids-container-text" style={{ textAlign: 'center' }}>
            <ol>
              <li>
                <span className='list-text'><span class="number">1.</span> Fund your wallet</span>
                <Button
                  width="150px"
                  height="50px"
                  marginLeft={32}
                  backgroundColor={{
                    "not_sent": 'gray',
                    "init": 'blue',
                    "sent": 'green',
                  }[faucetState]}
                  color={'white'}
                  onClick={
                    async () => {
                      if (faucetState === 'not_sent') {
                        setFaucetState('init')
                        setTxState('not_sent')
                        try {
                          await faucet(Object.values(capsule.getWallets())[0].address)
                        } catch {
                          setFaucetState('not_sent')
                        }
                      }
                    }}
                >
                  <Text
                    fontSize="14px"
                  >
                    {{
                      "not_sent": `Faucet`,
                      "init": "Pending...",
                      "sent": "Wallet Funded!",
                    }[faucetState]}
                  </Text>
                </Button>
              </li>
              <li>
                <span className='list-text'><span class="number">2.</span> Mint the NFT</span>
                <Button
                  width="150px"
                  height="50px"
                  backgroundColor={{
                    "not_sent": 'gray',
                    "init": 'blue',
                    "sent": 'green',
                  }[txState]}
                  marginLeft={32}
                  color={'white'}
                  onClick={
                    async () => {
                      if (txState === 'not_sent') {
                        setTxState("init")
                        setFaucetState('not_sent')
                        await sendTx()
                        setTxState("sent")
                      }
                    }}
                >
                  <Text
                    fontSize="14px"
                  >
                    {{
                      "not_sent": `Mint NFT!`,
                      "init": "Pending...",
                      "sent": "Bought!",
                    }[txState]}
                  </Text>
                </Button>
              </li>
            </ol>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            {txState === "sent" && faucetState !== 'sent' && (<div style={{ color: "white", marginBottom: 20 }}>
              <p>Track your minted NFT <a target='_blank' href={link} rel="noreferrer" style={{ color: "white" }}><u>here</u></a></p>
            </div>)}
            {faucetState === "sent" && txState !== 'sent' && (<div style={{ color: "white", marginBottom: 20 }}>
              <p>Track your funded wallet <a target='_blank' href={link} rel="noreferrer" style={{ color: "white" }}><u>here</u></a></p>
            </div>
            )}
          </div>
        </div>
        <div className="bids-container-card">
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                  <p style={{ fontSize: '2em' }}>Capsule NFT</p>
                </div>
                <img src={bids4} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>}
      <div className="nft-text-container">
        <p>
          This is a test application to illustrate Capsule's SDK and
          is intended to be used only for testing purposes. Assets used herein are on
          the Sepolia testnet and valueless. Additionally, this demo app is connected
          to a beta environment and test accounts created may be occasionally deleted.
        </p>
      </div>
    </>
  )
}

export default NFT
