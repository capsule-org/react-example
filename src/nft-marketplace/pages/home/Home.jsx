import React from 'react';
import { NFT, Header, } from '../../components'
import Capsule, { Environment } from "@usecapsule/web-sdk";
import { CapsuleButton } from '@usecapsule/web-sdk/dist/modal/CapsuleModal';
import './home.css'

const Home = () => {
  const environment = Environment.BETA;

  const capsule = new Capsule(environment, undefined, {
    offloadMPCComputationURL: 'https://partner-mpc-computation.beta.usecapsule.com',
  });

  return <><div className='center-content'>
      <Header />
      <div className='main-attraction'>
      <div className='center-button'>
        <CapsuleButton capsule={capsule} appName={"Capsule Marketplace"} />
      </div>
      <NFT environment={environment} capsule={capsule} />
    </div>
  </div>
        <div className="nft-text-container">
        <p>
          This is a test application to illustrate Capsule's SDK and
          is intended to be used only for testing purposes. Assets used herein are on
          the Sepolia testnet and valueless. Additionally, this demo app is connected
          to a beta environment and test accounts created may be occasionally deleted.
        </p>
      </div>
      </>
};

export default Home
