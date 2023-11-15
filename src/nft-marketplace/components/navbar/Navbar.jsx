import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from './logo.svg'
import { Link } from "react-router-dom";

const Menu = () => (
  <>
    <Link className="nav-link" target="_blank" rel="noreferrer" to='https://github.com/usecapsule/capsule-examples'>GitHub</Link>
    <Link className="nav-link" target="_blank" rel="noreferrer" to='https://docs.usecapsule.com/'>Docs</Link>
    <Link className="nav-link ui-button size-small style-border" target="_blank" rel="noreferrer" to='https://7f4shq8oyfd.typeform.com/to/F86oVLhb'>Get&nbsp;Access</Link>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <header className="site-header theme-dark">
      <div className="site-header__content">

        <a className="our-logo-container" href="/">
          <Link className="our-logo-container" to="https://usecapsule.com">
            <img src={logo} alt="Capsule" width="90px" height="20px" />
          </Link>
        </a>

        <nav className="header-main__nav">
          <Menu />
        </nav>

      </div>
    </header>
  );
}

export default Navbar
