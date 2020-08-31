import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.jpg'
import notFound from '../assets/404.svg'

export default class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="dz sos animal logo" />
          </div>
          <h3>DZ SOS Animal</h3>
        </div>
        <div className="main">
          <div className="not-found"> 
            <img src={notFound} alt="404 sign" />
          </div>
          <h4>Not Found</h4>
          <p>Sorry! The page you are looking does not exist.</p>
          <Link to="/">go back Home</Link>
        </div>
      </div>
    )
  }
}
