import React from 'react';
import { NFT, Header, } from '../../components'
import Capsule, { Environment } from "@usecapsule/react-sdk";
import './home.css'

// Get an api key at usecapsule.com
const TEST_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

const Home = () => {
  const environment = Environment.DEVELOPMENT;

  const capsule = new Capsule(environment, TEST_API_KEY);

  return <main className="main-page-content tuck-below-header">
    <section className="section-about-hero theme-dark">
      <div className="section-content" style={{maxWidth: '41em'}}>
        <NFT environment={environment} capsule={capsule} />
      </div>

      <img className="sunrise-graphic img-loaded" src="https://assets.codepen.io/44800/capsule-sunrise-about-hero.svg?" alt=""></img>

    </section>
    <footer class="site-footer theme-dark">
      <div class="site-footer__content">
        <section class="site-footer__featured-area">
        </section>
      </div>
    </footer>
  </main>;
}

export default Home
