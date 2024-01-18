/* eslint-disable import/first */
import { Buffer } from 'buffer'
global.Buffer = Buffer
import React, { useState, useEffect } from 'react'
import './nft.css'
import { ethers } from "ethers"
import Web3 from 'web3'
import bids4 from '../../assets/nft.png'
import { Button, Text, Tooltip } from '@chakra-ui/react'
import { getBaseUrl } from '@usecapsule/web-sdk/dist/core/external/capsuleClient'
import { CapsuleButton } from '@usecapsule/web-sdk/dist/modal/CapsuleModal';
import { CapsuleEthersSigner } from "@usecapsule/web-sdk"
import { Header } from '../../components'
import MINTER_CONTRACT_ABI from "./MINTER_ABI.json"
import NFT_ABI from "./NFT_ABI.json"

const MINTER_CONTRACT_ADDRESS = '0x00005ea00ac477b1030ce78506496e8c2de24bf5'
const DEFAULT_CHAIN_ID = '11155111';
const MINT_PRICE = '0.0000001'
const MINTER_FEE_RECIPIENT = '0x0000a26b00c1F0DF003000390027140000fAa719';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const MINTER_IF_NOT_PAYER = ZERO_ADDRESS;
const MINTER_QUANTITY = '1';

const NFT_CONTRACT_ADDRESS = '0xdAfB9d117B585E406A74E84977Fa82DdEE8B0a32'

const INFURA_HOST = 'https://sepolia.infura.io/v3/961364684c7346c080994baab1469ea8';
const provider = new ethers.JsonRpcProvider(INFURA_HOST, 'sepolia')

const NFT = ({ environment, capsule }) => {
  const [txState, setTxState] = useState("not_sent");
  const [faucetState, setFaucetState] = useState('not_sent');
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasUsedFaucet, setHasUsedFaucet] = useState(false);
  const [walletAddress, setWalletAddress] = useState(undefined);

  useEffect(() => {
    const updateLoginStatus = async () => {
      const isLoggedIn = await capsule.isSessionActive();
      setLoggedIn(isLoggedIn);
      if (!isLoggedIn) {
        setTxState("not_sent")
        setFaucetState("not_sent")
        setHasUsedFaucet(false)
      }

      const currentWalletAddress = Object.values(capsule.getWallets())?.[0]?.address;
      if (currentWalletAddress !== walletAddress) {
        setWalletAddress(currentWalletAddress);
      }
    };

    updateLoginStatus();

    // Then call it every second
    const intervalId = setInterval(updateLoginStatus, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  // only set interval on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateAccountStatus = async () => {
      if (!walletAddress) {
        setHasUsedFaucet(false);
        setTxState("not_sent")
        setFaucetState("not_sent")
        return
      }
      const faucetUsed = await hasWalletUsedCapsuleFaucet();
      setHasUsedFaucet(faucetUsed);
      const didMintNFT = await hasMintedNFT()
      if (didMintNFT) {
        setTxState("sent")
      }
    };

    updateAccountStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

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

  const link = `https://sepolia.etherscan.io/address/${walletAddress}`
  const web3 = new Web3(INFURA_HOST);
  const ethersSigner = new CapsuleEthersSigner(capsule, provider);

  async function hasMintedNFT() {
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, ethersSigner);
    const res = await contract.balanceOf(walletAddress)
    return res && parseInt(res) === 1
  }

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

    const tx = {
      from: Object.values(capsule.getWallets())[0]?.address,
      to: toAddress,
      value: value ? web3.utils.toHex(web3.utils.toWei(value, 'ether')) : undefined,
      gasLimit: web3.utils.toHex(Number(gasAmount)),
      maxPriorityFeePerGas: maxPriorityFeePerGas ? web3.utils.toHex(web3.utils.toWei(maxPriorityFeePerGas, 'gwei')) : undefined,
      maxFeePerGas: maxFeePerGas ? web3.utils.toHex(web3.utils.toWei(maxFeePerGas, 'gwei')) : undefined,
      nonce: web3.utils.toHex(Number(nonce)),
      data: functionCallData || deployByteCode || undefined,
      chainId,
      type: 2,
    };
    return tx;
  }

  async function sendTx() {
    const nonce = await web3.eth.getTransactionCount(walletAddress);
    const tx = await createTransaction(
      MINTER_CONTRACT_ADDRESS,
      MINT_PRICE,
      "140000",
      null,
      '3',
      nonce.toString(),
      DEFAULT_CHAIN_ID,
      JSON.stringify(MINTER_CONTRACT_ABI),
      'mintPublic',
      [NFT_CONTRACT_ADDRESS, MINTER_FEE_RECIPIENT, MINTER_IF_NOT_PAYER, MINTER_QUANTITY],
      '',
    );

    const txResponse = await ethersSigner.sendTransaction(tx);
    const txReceipt = await txResponse.wait(1, 10_000);
    return txReceipt?.status === 1 // is success
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
                <Tooltip placement='right' color="white" label="Congratulations! You have minted the Capsule NFT." isDisabled={txState !== 'sent'}>
                  <Button
                    width="150px"
                    height="50px"
                    backgroundColor={{
                      "not_sent": 'black',
                      "error": 'red',
                      "init": 'blue',
                      "sent": 'green',
                    }[txState]}
                    marginLeft={32}
                    color={'white'}
                    onClick={
                      async () => {
                        if (txState === 'not_sent') {
                          setTxState("init");
                          setFaucetState('not_sent');
                          try {
                            const isSuccess = await sendTx();
                            if (isSuccess) {
                              setTxState("sent");
                            } else {
                               setTxState("error");
                            }
                          } catch (e) {
                            console.error(e);
                            setTxState("error");
                          }
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
                        "error": "Failed!"
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
            {txState === "error" && (<div style={{ color: "white", marginBottom: 20 }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: "italic" }}>Failed to send transaction. The network may be too busy to handle this request. Please check back later or ask Capsule for assistance.</p>
            </div>)}
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
