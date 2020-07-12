import React, { Component } from 'react'
import Search from './Search'
import logo from '../assets/logo.jpg'
import { ViewportProps } from 'react-map-gl'

interface IProps {
  setViewport: (viewport: ViewportProps) => void
}

export default class Navbar extends Component<IProps> {
  render() {
    const { setViewport } = this.props
    return (
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt='SOS Animal' />
        </div>
        <Search setViewport={setViewport} />
      </div>
    )
  }
}
