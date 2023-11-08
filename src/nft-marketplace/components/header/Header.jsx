import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import capsule_logo from '../../assets/capsule-logo.svg'
const Header = (props) => {
  return (
    <div className='header'>
      <div className="header-content">
        <div className="text-container">
          <h1>Capsule Demo App</h1>
          <p>An onboarding + NFT mint experience, powered by Capsule.</p>
          <p>Check it out and let us know what you think!</p>
        </div>
      </div>
    </div>
  )
}

export default Header
