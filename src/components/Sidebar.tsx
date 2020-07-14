import React, { Component } from 'react'

import AddAnimal from './AddAnimal'

interface IProps {
  isSideOpen: boolean
  toggleSide: (isSideOpen: boolean) => void
  saveAnimal: () => void
  cancelAnimal: () => void
}

export default class Sidebar extends Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { isSideOpen, toggleSide, saveAnimal, cancelAnimal } = this.props

    return (
      <div className={`sidebar-container ${isSideOpen ? 'side-open': ''}`}>
        <AddAnimal 
          toggleSide={toggleSide} 
          saveAnimal={saveAnimal}
          cancelAnimal={cancelAnimal}
          />
        {/* Display animal  */}
      </div>
    )
  }
}
