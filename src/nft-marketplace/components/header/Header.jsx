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
          <p>This app is a sample NFT Mint Site using the Capsule SDK</p>
        </div>
        <img className='shake-vertical img-styling' src={capsule_logo} alt="" />
      </div>
    </div>
  )
}

export default Header
