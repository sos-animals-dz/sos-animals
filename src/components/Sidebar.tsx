import React, { Component } from 'react'

import AddAnimal from './AddAnimal'
import DisplayAnimal from './DisplayAnimal';

interface IProps {
  isSideOpen: false | 'display-animal' | 'add-animal'
  toggleSide: (isSideOpen: false | 'display-animal' | 'add-animal') => void
  saveAnimal: (type: string, description: string, picture: string) => void
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
        {
          isSideOpen === "add-animal" ?
            <AddAnimal 
              toggleSide={toggleSide} 
              saveAnimal={saveAnimal}
              cancelAnimal={cancelAnimal}
              />
            :
            <DisplayAnimal />
        }
      </div>
    )
  }
}
