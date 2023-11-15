import React from 'react';
import { NFT, Header, } from '../../components'
import Capsule, { Environment } from "@usecapsule/web-sdk";
import './home.css'

const Home = () => {
  const environment = Environment.BETA;

  const capsule = new Capsule(environment, undefined, {
    offloadMPCComputationURL: 'https://partner-mpc-computation.beta.usecapsule.com',
  });

  return <main className="main-page-content tuck-below-header">
  <section className="section-about-hero theme-dark">
      <div className="section-content" style={{maxWidth: '41em'}}>
        <NFT environment={environment} capsule={capsule} />
      </div>

      <img className="sunrise-graphic img-loaded" src="https://assets.codepen.io/44800/capsule-sunrise-about-hero.svg?" alt=""></img>

      <section class="section-about-values">
        <div class="section-content">

          <h2 class="text-gradient-bidirectional" style={{paddingBottom: '1000px' /* Gradient Clip Fix */}}>
          </h2>

        </div>
      </section>
          </section>
  </main>;
}

export default Home
