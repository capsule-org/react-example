import React from 'react';
import {NFT, Header, } from '../../components'
import {CapsuleButton} from "@usecapsule/web-sdk/dist/modal/CapsuleModal";
import Capsule, {Environment} from "@usecapsule/web-sdk";
import './home.css'

const Home = () => {
  return <div className='center-content'>
    <Header />
    <CapsuleButton className="larger-btn" capsule={capsule} appName={"Capsule Marketplace"} />
    <NFT /> {/*loggedIn={true}  /> */}
  </div>;
};
export const capsule = new Capsule(Environment.SANDBOX)

export default Home;
