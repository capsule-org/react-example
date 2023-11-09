import React from 'react';
import { NFT, Header, } from '../../components'
import Capsule, { Environment } from "@usecapsule/web-sdk";
import './home.css'

const Home = () => {
  const environment = Environment.DEVELOPMENT;

  const capsule = new Capsule(environment, undefined);

  return <>
    <div className='center-content'>
      <div className='main-attraction'>
        <NFT environment={environment} capsule={capsule} />
      </div>
    </div>
  </>
};

export default Home
