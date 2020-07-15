import React, { Component } from 'react'
import { ViewportProps } from 'react-map-gl'
import Search from './Search'
import IAnimal from '../interfaces/IAnimal'

import logo from '../assets/logo.jpg'
import add from '../assets/add.jpg'
import addActive from '../assets/add-active.jpg'

interface IProps {
  setViewport: (viewport: ViewportProps) => void
  toggleIsAddAnimal: () => void
  isAddAnimal: boolean
  isSideOpen: false | IAnimal | 'add-animal'
}

export default class Navbar extends Component<IProps> {

  onAddAnimalClick = () => {
    const { isSideOpen, toggleIsAddAnimal } = this.props
    if (isSideOpen !== "add-animal") {
      toggleIsAddAnimal()
    }
  }

  render() {
    const { setViewport, isAddAnimal } = this.props
    return (
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt='SOS Animal' />
        </div>
        <button 
          title={`${isAddAnimal ? 'disable add-animal mode' : 'enable add-animal mode'}`} 
          className={`add-animal ${isAddAnimal ? 'active' : ''}`} 
          onClick={this.onAddAnimalClick}>
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
