/* eslint-disable import/first */
import { Buffer } from 'buffer'
global.Buffer = Buffer
import React, { useState, useEffect, useRef } from 'react'
import './nft.css'
import Web3 from 'web3'
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import bids4 from '../../assets/nft.png'
import { Button, Text, Tooltip } from '@chakra-ui/react'
import { getBaseUrl } from '@usecapsule/web-sdk/dist/core/external/capsuleClient'
import { CapsuleButton } from '@usecapsule/web-sdk/dist/modal/CapsuleModal';
import { Header, } from '../../components'

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

const NFT = ({ environment, capsule }) => {

  const [txState, setTxState] = useState("not_sent");
  const [faucetState, setFaucetState] = useState('not_sent');
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasUsedFaucet, setHasUsedFaucet] = useState(false);

  let prevWalletAddress = useRef();

  useEffect(() => {
    const updateLoginStatus = async () => {
      const isLoggedIn = await capsule.isSessionActive();
      setLoggedIn(isLoggedIn);

      const currentWalletAddress = Object.values(capsule.getWallets())?.[0]?.address;
      if (currentWalletAddress && currentWalletAddress !== prevWalletAddress.current) {
        const faucetUsed = await hasWalletUsedCapsuleFaucet();
        setHasUsedFaucet(faucetUsed);
        prevWalletAddress.current = currentWalletAddress;
      }
    };

    updateLoginStatus();

    // Then call it every second
    const intervalId = setInterval(updateLoginStatus, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  async function hasWalletUsedCapsuleFaucet() {
    try {
      const walletId = capsule.getWallets()?.[Object.keys(capsule.getWallets())[0]]?.id;
      const url = `${getBaseUrl(environment)}demo/wallets/${walletId}/has-used-faucet`
      const response = await fetch(url);
      const data = await response.json();
      const { hasWalletUsedFaucet } = data;
      return hasWalletUsedFaucet;
    } catch (error) {
      return false;
    }
  }


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
    await capsule.sendTransaction(walletId, tx, `${DEFAULT_CHAIN_ID}`);
  }

  async function faucet() {
    try {
      const walletId = capsule.getWallets()?.[Object.keys(capsule.getWallets())[0]]?.id;
      const url = `${getBaseUrl(environment)}demo/wallets/${walletId}/use-faucet`
      const response = await fetch(url, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setFaucetState("sent");
      setTimeout(() => {
        setHasUsedFaucet(true);
      }, 3000);
    } catch (error) {
      console.error('Failed to fetch transactions: ', error);
      setFaucetState("not_sent");
    }
  }

  return (
    <>
    <div className="sidebar">
      <Header />
      <div className='center-button'>
        <CapsuleButton capsule={capsule} appName={"Capsule Demo App"} onClick={() => setHasUsedFaucet(false)} />
      </div>
      {loggedIn && <div className='bids section__padding nft-center-button'>
        <div className="bids-container">
          <div className='instruction-style'>Instructions</div>
          <div className="bids-container-text" style={{ textAlign: 'center' }}>
            <ol>
              <li>
                <span className='list-text'><span className="number">1.</span> Fund your wallet</span>
                <Tooltip placement='right' color="white" label="We only allow one faucet call per wallet." isDisabled={!hasUsedFaucet}>
                  <Button
                    width="150px"
                    height="50px"
                    marginLeft={32}
                    backgroundColor={hasUsedFaucet ? "green" : {
                      "not_sent": 'black',
                      "init": 'blue',
                      "sent": 'green',
                    }[faucetState]}
                    isDisabled={hasUsedFaucet}
                    color={'white'}
                    onClick={
                      async () => {
                        if (!hasUsedFaucet && faucetState === 'not_sent') {
                          setFaucetState('init')
                          setTxState('not_sent')
                          try {
                            await faucet()
                          } catch {
                            setFaucetState('not_sent')
                          }
                        }
                      }}
                  >
                    <Text
                      fontSize="14px"
                    >
                      {hasUsedFaucet ? "Faucet Used!" : {
                        "not_sent": `Faucet`,
                        "init": "Pending...",
                        "sent": "Wallet Funded!",
                      }[faucetState]}
                    </Text>
                  </Button>
                </Tooltip>
              </li>
              <li>
                <span className='list-text'><span className="number">2.</span> Mint the NFT</span>
                <Tooltip placement='right' color="white" label="Congratulations! Refresh the page to mint again." isDisabled={txState !== 'sent'}>
                  <Button
                    width="150px"
                    height="50px"
                    backgroundColor={{
                      "not_sent": 'black',
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
                        "sent": "Minted!",
                      }[txState]}
                    </Text>
                  </Button>
                </Tooltip>
              </li>
            </ol>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            {txState === "sent" && faucetState !== 'sent' && (<div style={{ color: "white", marginBottom: 20 }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: "italic" }}>Track your minted NFT <a target='_blank' href={link} rel="noreferrer" style={{ color: "white" }}><u>here</u></a></p>
            </div>)}
            {faucetState === "sent" && txState !== 'sent' && (<div style={{ color: "white", marginBottom: 20 }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: "italic" }}>Track your funded wallet <a target='_blank' href={link} rel="noreferrer" style={{ color: "white" }}><u>here</u></a></p>
            </div>
            )}
          </div>
        </div>
      </div>}
      </div>
      {loggedIn && <div className="bids-container-card">
        <div className="card-column">
          <div className="bids-card">
            <div className="bids-card-top">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20 }}>
                <p style={{ fontSize: '2em' }}>Capsule NFT</p>
              </div>
              <img src={bids4} alt="NFT"/>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default NFT
