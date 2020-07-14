import React, { Component } from 'react'
import { ViewportProps } from 'react-map-gl'
import Search from './Search'

import logo from '../assets/logo.jpg'
import add from '../assets/add.jpg'
import addActive from '../assets/add-active.jpg'

interface IProps {
  setViewport: (viewport: ViewportProps) => void
  toggleIsAddAnimal: () => void
  isAddAnimal: boolean
}

export default class Navbar extends Component<IProps> {
  render() {
    const { setViewport, toggleIsAddAnimal, isAddAnimal } = this.props
    return (
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt='SOS Animal' />
        </div>
        <button className={`add-animal ${isAddAnimal ? 'active' : ''}`} onClick={toggleIsAddAnimal}>
        {
          isAddAnimal ?
            <img src={addActive} alt='add animal' /> 
            : 
            <img src={add} alt='add animal' />
        }  
        </button>
        <Search setViewport={setViewport} />
      </div>
    )
  }
}
