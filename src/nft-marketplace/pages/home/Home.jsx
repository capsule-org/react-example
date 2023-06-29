import React from 'react';
import {NFT, Header, } from '../../components'
import Capsule, {Environment} from "@usecapsule/web-sdk";
import { connect } from 'react-redux';
// import { CapsuleButton } from '@usecapsule/web-sdk/dist/modal/CapsuleModal';
import CapsuleButton from '../../components/button/CapsuleButton';
import './home.css'

const Home = ({ dispatch }) => {

  const capsule = new Capsule(Environment.SANDBOX);

  return <div className='center-content'>
    <Header />
    <CapsuleButton loginCallback={isLoggedIn => dispatch({ type: 'SET_LOGGED_IN', payload: isLoggedIn })} capsule={capsule} appName={"Capsule Marketplace"} />
    <NFT capsule={capsule}/>
  </div>;
};

export default connect()(Home)
