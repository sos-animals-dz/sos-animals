import React, { Component } from 'react'
import { ViewportProps } from 'react-map-gl'
import Search from './Search'

import logo from '../assets/logo.jpg'
import add from '../assets/add.jpg'
import addActive from '../assets/add-active.jpg'

interface IProps {
  setViewport: (viewport: ViewportProps) => void
  addAnimal: () => void
  isAddAnimal: boolean
}

export default class Navbar extends Component<IProps> {
  render() {
    const { setViewport, addAnimal, isAddAnimal } = this.props
    return (
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt='SOS Animal' />
        </div>
        <button className={`add-animal ${isAddAnimal ? 'active' : ''}`} onClick={addAnimal}>
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
