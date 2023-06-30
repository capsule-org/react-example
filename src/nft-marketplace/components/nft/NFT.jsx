/* eslint-disable import/first */
import { Buffer } from 'buffer'
global.Buffer = Buffer
import React, { useState, useEffect } from 'react'
import './nft.css'
import Web3 from 'web3'
import { connect } from 'react-redux';
import { AiFillHeart } from "react-icons/ai";
import { Transaction } from '@ethereumjs/tx';
import { Common } from '@ethereumjs/common'
import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import bids4 from '../../assets/bids4.png'
import bids5 from '../../assets/bids5.png'
import bids6 from '../../assets/bids6.png'
import bids7 from '../../assets/bids7.png'
import bids8 from '../../assets/bids8.png' 
import { Button, Text } from '@chakra-ui/react'
import contractJson from '../../artifacts/contracts/NFT.sol/CapsuleMarketplace.json';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const CHAIN_ID = '31337';
const DEFAULT_GAS_PRICE = '5';
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
const DEFAULT_SMART_CONTRACT_FUNCTION = 'store';
const DEFAULT_SMART_CONTRACT_ARGS = ['808'];

const NFT = ({ capsule, dispatch, loggedIn }) => {

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [likes, setLikes] = useState(0);
  const [image, setImage] = useState("");
  const [ownsNFT, setOwnsNFT] = useState(false);
  const [ownedNFT, setOwnedNFT] = useState(null);

  const link = `https://sepolia.etherscan.io/address/${Object.values(capsule.getWallets())?.[0]?.address}`

  const [txState, setTxState] = useState("not_sent")

  const web3 = new Web3(Web3.givenProvider);
  const abi = contractJson.abi;


  useEffect(() => {
    const randomBids = {
      "Abstract Smoke Red": bids1, 
      "Mountain Landscape": bids2, 
      "Paint Color on Wall": bids3, 
      "Abstract Pattern": bids4, 
      "White Line Graffiti": bids5, 
      "Abstract Triangle": bids6, 
      "Lake Landscape": bids7, 
      "Blue Red Art": bids8,
    };

    const keys = Object.keys(randomBids);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    setTitle(randomKey);
    setImage(randomBids[randomKey]);
    setValue((Math.random() * 1000).toFixed(2)); // random value between 0 and 10, rounded to 2 decimal places
    setLikes(Math.floor(Math.random() * 100) + 1);

    // if (loggedIn) {
    //   fetchOwnedNFT();
    // }
  }, []);

  // async function fetchOwnedNFT() {
  //   try {
  //     const {tokenId, name, price, likeCount} = await sendTransaction('getOwnedNFT', []);
  //     console.log(`${tokenId}, ${name}, ${price}, ${likeCount}`)
  //     setOwnedNFT({tokenId, name, price, likeCount});
  //     setOwnsNFT(true);
  //   } catch (error) {
  //     // User doesn't own an NFT.
  //     setOwnsNFT(false);
  //     setOwnedNFT(null);
  //   }
  // }

  function generateNFTTokenId() {
    let tokenID = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
  
    for ( let i = 0; i < 32; i++ ) {
        tokenID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return tokenID;
  }

  async function createTransaction(
    toAddress,
    value,
    gasAmount,
    gasPrice,
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

    const tx = new Transaction({
      to: !deployByteCode ? toAddress : undefined,
      value: value ? web3.utils.toHex(web3.utils.toWei(value, 'gwei')) : undefined,
      gasLimit: web3.utils.toHex(Number(gasAmount)),
      gasPrice: web3.utils.toHex(web3.utils.toWei(gasPrice, 'gwei')),
      nonce: web3.utils.toHex(Number(nonce)),
      data: functionCallData || deployByteCode || undefined,
    }, { common: Common.custom({ chainId: Number(chainId) }) });

    return tx.serialize().toString('base64');
  }

  async function sendTx() {
    if (!(await capsule.isSessionActive())) {
      await capsule.refreshSession(true)
    }
    while (!(await capsule.isSessionActive())) {
      console.log("XXXX")
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    const walletId = capsule.getWallets()?.[Object.keys(capsule.getWallets())[0]]?.id;
  
    let nonce = 0;
    try {
      nonce = await web3.eth.getTransactionCount(Object.values(capsule.getWallets())[0].address)
    } catch (e) {
      console.log(e)
    }
    console.log(nonce, ":)")
    const tx = await createTransaction(
      DEFAULT_CONTRACT_ADDRESS,
      0,
      1400000,
      DEFAULT_GAS_PRICE,
      nonce.toString(),
      DEFAULT_CHAIN_ID,
      JSON.stringify(DEFAULT_CONTRACT_ABI),
      DEFAULT_SMART_CONTRACT_FUNCTION,
      DEFAULT_SMART_CONTRACT_ARGS,
      '',
    );
    const res = await capsule.sendTransaction(walletId, tx, `${DEFAULT_CHAIN_ID}`);
    console.log(res)
  }

  async function sendTransaction(transactionName, functionArgs) {
    const walletId = capsule.getWallets()?.[Object.keys(capsule.getWallets())[0]]?.id;

    let nonce = 0;
    try {
      nonce = await web3.eth.getTransactionCount(Object.values(capsule.getWallets())[0].address)
    } catch (e) {
      console.log(e)
    }

    const tx = await createTransaction(
      CONTRACT_ADDRESS,
      0,
      1400000,
      DEFAULT_GAS_PRICE,
      nonce.toString(),
      CHAIN_ID,
      JSON.stringify(abi),
      transactionName,
      functionArgs,
      '',
    );
    const res = await capsule.sendTransaction(walletId, tx, `${CHAIN_ID}`);
    console.log(res)
  }

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          {loggedIn === true ? <h1>Check out this NFT!</h1>  : <h1>Login to Check out this NFT!</h1>}
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
                {txState === "sent" && (<div className="item-content-detail">
              <p>Track your Tx <a href={link}>here</a></p>
            </div>)}
                <Button 
                  width="150px" 
                  height="50px" 
                  backgroundColor={'orange'} 
                  color={'white'}
                  onClick={
                    async () => {
                      if (txState === 'not_sent') {
                        setTxState("init")
                        console.log(capsule.getWallets())
                        await sendTx()
                        setTxState("sent")
                      }
                    }
                  }
                >
                  <Text 
                    marginBottom={12}
                  >
                    {{
                    "not_sent": `Buy For ${value} ETH`,
                    "init": "Pending...",
                    "sent": "Bought!",
              }[txState]}
                  </Text>
                </Button>
                </div> 
                :  null
              }
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <p style={{ fontSize: '2em' }}>{title}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2em', padding: 12 }}>
                        <p className="bids-value">{value} <span>ETH</span></p>
                        <p style={{ fontSize: '1em', display: 'flex', justifyContent: 'space-around' }}> {likes} <AiFillHeart /></p>
                    </div>
                </div>
                <img src={image} alt="" />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(NFT)
