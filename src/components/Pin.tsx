import React, { Component } from 'react'
import IAnimal from '../interfaces/IAnimal'
import pin from '../assets/pin.svg'
import birdPin from '../assets/bird.svg'
import dogPin from '../assets/dog.svg'
import catPin from '../assets/cat.svg'
import petPin from '../assets/pet.svg'

interface IProps {
  id: number
  type: string
  isSideOpen: false | IAnimal | 'add-animal'
  displayAnimal: (id: number) => void
}

export default class Pin extends Component<IProps> {

  onPinDoubleClick = () => {
    const { id, displayAnimal, isSideOpen } = this.props
    if (isSideOpen !== "add-animal") {
      displayAnimal(id)
    }
  }

  renderPin = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "bird":
        return <img src={birdPin} alt="pin" /> 
      
      case "dog":
        return <img src={dogPin} alt="pin" /> 
      
      case "cat":
        return <img src={catPin} alt="pin" /> 
      
      case "other":
        return <img src={petPin} alt="pin" /> 

      default:
        return <img src={pin} alt="pin" />
    }
  }

  render() {
    const { type } = this.props
    return (
      <div className="pin-container">
        <div 
          onDoubleClick={this.onPinDoubleClick}
          className="pin"
          title="Double click to get all the informations."
          >
          { this.renderPin(type) }
        </div>
      </div>
    )
  }
}
