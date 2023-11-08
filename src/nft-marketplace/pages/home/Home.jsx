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

  return <div className='center-content'>
    <table>
      <tr>
      <td>
      <Header />
      </td>
      <td>
      <div className='main-attraction'>
      <div className='center-button'>
        <CapsuleButton capsule={capsule} appName={"Capsule Marketplace"} />
      </div>
      <NFT environment={environment} capsule={capsule} />
    </div>
      </td>
      </tr>
      <tr>
        <td></td>
      </tr>
    </table>
  </div>
};

export default Home
