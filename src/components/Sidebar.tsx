import React, { Component } from 'react'

import AddAnimal from './AddAnimal'

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <AddAnimal />
        {/* Display animal  */}
      </div>
    )
  }
}
