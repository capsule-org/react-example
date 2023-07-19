import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import capsule_logo from '../../assets/capsule-logo.svg'
const Header = (props) => {
  return (
    <div className='header section__padding'>
      <div className="header-content">
        <div>
          <h1>Check out this Demo App of an NFT Mint to see how Capsule's SDKs improve user experiences in crypto</h1>
          <img className='shake-vertical' src={capsule_logo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
