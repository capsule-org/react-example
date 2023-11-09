import React from 'react';
import { NFT, Header, } from '../../components'
import Capsule, { Environment } from "@usecapsule/web-sdk";
import './home.css'

const Home = () => {
  const environment = Environment.BETA;

  const capsule = new Capsule(environment, undefined, {
    offloadMPCComputationURL: 'https://partner-mpc-computation.beta.usecapsule.com',
  });

  return <>
    <div className='center-content'>
      <div className='main-attraction'>
        <NFT environment={environment} capsule={capsule} />
      </div>
    </div>
  </>
};

export default Home
