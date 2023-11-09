import React from 'react';
import { NFT, Header, } from '../../components'
import Capsule, { Environment } from "@usecapsule/web-sdk";
import './home.css'

// Get an api key at usecapsule.com
const TEST_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

const Home = () => {
  const environment = Environment.DEVELOPMENT;

  const capsule = new Capsule(environment, TEST_API_KEY);

  return <>
    <div className='center-content'>
      <div className='main-attraction'>
        <NFT environment={environment} capsule={capsule} />
      </div>
    </div>
  </>
};

export default Home
