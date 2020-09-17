import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { User as IUser } from 'firebase'
import { logout } from '../firebase/utils'

import logoutIcon from '../assets/logout.svg'
import settingsIcon from '../assets/settings.svg'

interface IProps {
  loggedUser: IUser
  isAdmin?: boolean
}

export default class User extends Component<IProps> {
  render() {
    const { isAdmin } = this.props
    return (<div className="user" >
      {
        isAdmin ?
          <Link className="home-link" to="/">Home</Link> 
          :
          <Link className="logout-link" to="/admin">
            <img src={settingsIcon} alt="dashboard" title="admin dashboard" />
          </Link>
      }
      <button className="logout-btn" onClick={logout}>
        <img src={logoutIcon} alt="logout" title="logout" />
      </button>
    </div>)
  }
}
