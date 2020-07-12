import React, { Component } from 'react'
import Search from './Search'
import logo from '../assets/logo.jpg'

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt='SOS Animal' />
        </div>
        <Search />
      </div>
    )
  }
}
