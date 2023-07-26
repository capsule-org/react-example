import React from 'react';
import { NFT, Header, } from '../../components'
import Capsule, { Environment } from "@usecapsule/web-sdk";
import { CapsuleButton } from '@usecapsule/web-sdk/dist/modal/CapsuleModal';
import './home.css'

const Home = () => {
  const environment = Environment.DEV;
  // const environment = Environment.BETA;

  const capsule = new Capsule(environment, undefined, {
    offloadMPCComputationURL: 'http://localhost:9009'
    // offloadMPCComputationURL: 'https://partner-mpc-computation.beta.usecapsule.com',
  });

  return <div className='center-content'>
    <Header />
    <div className='center-button'>
      <CapsuleButton capsule={capsule} appName={"Capsule Marketplace"} />
    </div>
    <NFT environment={environment} capsule={capsule} />
  </div>;
};

export default Home
