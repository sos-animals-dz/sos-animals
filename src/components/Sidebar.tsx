import React, { Component } from 'react'

import AddAnimal from './AddAnimal'
import DisplayAnimal from './DisplayAnimal'
import IAnimal from '../interfaces/IAnimal'

interface IProps {
  isSideOpen: false | IAnimal | 'add-animal'
  toggleSide: (isSideOpen: false | IAnimal | 'add-animal') => void
  saveAnimal: (type: string, description: string, picture: string) => void
  cancelAnimal: () => void
  reportAnimal: (id: number) => void
}

export default class Sidebar extends Component<IProps> {

  render() {
    const { isSideOpen, toggleSide, saveAnimal, cancelAnimal, reportAnimal } = this.props

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
            isSideOpen !== false ? <DisplayAnimal animal={isSideOpen} toggleSide={toggleSide} reportAnimal={reportAnimal}/> : <></>
        }
      </div>
    )
  }
}
