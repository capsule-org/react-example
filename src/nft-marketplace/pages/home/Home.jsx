import React from 'react';
import { NFT, Header, } from '../../components'
import Capsule, { Environment } from "@usecapsule/web-sdk";
import { CapsuleButton } from '@usecapsule/web-sdk/dist/modal/CapsuleModal';
import './home.css'

const Home = () => {

  const capsule = new Capsule(Environment.SANDBOX, undefined, {
    // offloadMPCComputationURL: 'http://localhost:9009'
    offloadMPCComputationURL: 'https://partner-mpc-computation.sandbox.usecapsule.com',
  });

  return <div className='center-content'>
    <Header />
    <CapsuleButton capsule={capsule} appName={"Capsule Marketplace"} />
    <NFT capsule={capsule} />
  </div>;
};

export default Home
