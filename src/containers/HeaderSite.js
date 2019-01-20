import React from 'react'
import { Link } from 'react-router-dom'
import './style/HeaderSite.css'
import Logo from '../img/logo.png'

const HeaderSite = ({ redirect, click, logout }) => (
  <div className='header'>
    <div className='header-site-logo'>
      <Link to={redirect}>
        <div className='header-site-logo-name'>
          <img src={Logo} className='logo-litta' alt='Logo LITTA'></img>
          <div className='name-litta'>
            <span>LITTA</span>
            <br/>
            <span>Legal Intern to Take Away</span>
          </div>
        </div>
      </Link>
    </div>
    <div className='header-site-logout'>
      <div className='logout' onClick={click}>
        <span>{logout}</span>
      </div>
    </div>
  </div>
)

export default HeaderSite
