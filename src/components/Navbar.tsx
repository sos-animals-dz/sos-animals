import React, { Component } from 'react'
import { ViewportProps } from 'react-map-gl'
import { User as IUser } from "firebase"
import { Link } from 'react-router-dom'

import Search from './Search'
import User from './User'

import IAnimal from '../interfaces/IAnimal'

import logo from '../assets/logo.jpg'
import add from '../assets/add.jpg'
import addActive from '../assets/add-active.jpg'
import loginIcon from '../assets/login.svg'

interface IProps {
  setViewport?: (viewport: ViewportProps) => void
  toggleIsAddAnimal?: () => void
  isAddAnimal?: boolean
  isSideOpen?: false | IAnimal | 'add-animal'
  loggedUser?: IUser | null
  isAdmin?: boolean
}

export default class Navbar extends Component<IProps> {

  onAddAnimalClick = () => {
    const { isSideOpen, toggleIsAddAnimal } = this.props
    if (isSideOpen !== "add-animal" && toggleIsAddAnimal) {
      toggleIsAddAnimal()
    }
  }

  render() {
    const { setViewport, isAddAnimal, loggedUser, isAdmin } = this.props
    return (
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt='SOS Animal' />
        </div>
        {
          isAdmin ?
          <>
          
          <p>back home</p>
          </>
          :
          <>
            <button 
              title={`${isAddAnimal ? 'disable add-animal' : 'enable add-animal'}`} 
              className={`add-animal ${isAddAnimal ? 'active' : ''}`} 
              onClick={this.onAddAnimalClick}
              >
              { isAddAnimal ? <img src={addActive} alt='add animal' /> :  <img src={add} alt='add animal' /> }  
            </button>
            { setViewport && <Search setViewport={setViewport} /> }
            { loggedUser ? <User loggedUser={loggedUser} /> : <Link className="login-link" to="/login"><img src={loginIcon} alt="login" title="login" /></Link> }
          </>
        }
        
      </div>
    )
  }
}
