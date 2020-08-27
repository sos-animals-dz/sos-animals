import React, { Component } from 'react'
import Navbar from './Navbar'; // import from axios

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Navbar isAdmin={true} />
      </div>
    )
  }
}
