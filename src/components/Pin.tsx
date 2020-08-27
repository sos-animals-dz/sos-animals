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
  displayAnimal: (id: number) => void
  isSideOpen: false | IAnimal | 'add-animal'
}

interface IState {
  showType: boolean
}

export default class Pin extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      showType: false
    }
  }

  onPinMouseOver = () => {
    const { isSideOpen } = this.props
    if (isSideOpen !== "add-animal") {
      this.setState({ showType: true })
    }
  }

  onPinMouseLeave = () => {
    const { isSideOpen } = this.props
    if (isSideOpen !== "add-animal") {
      this.setState({ showType: false })
    }
  }
  
  onPinDoubleClick = () => {
    const { id, displayAnimal, isSideOpen } = this.props
    if (isSideOpen !== "add-animal") {
      displayAnimal(id)
    }
  }

  render() {
    const { type } = this.props
    const { showType } = this.state
    return (
      <div className="pin-container">
        {
          showType && <div className="show-type">
            <p>{ type }</p>
          </div>
        }
        <div 
          onDoubleClick={this.onPinDoubleClick} 
          onMouseOver={this.onPinMouseOver} 
          onMouseLeave={this.onPinMouseLeave}
          className="pin"
          >

	  {
	    type === 'bird' ?
	      <img src={birdPin} alt="pin" />
	      :
	      type === 'dog' ?
		<img src={dogPin} alt="pin" />
		:
		type === 'cat' ?
		  <img src={catPin} alt="pin" />
		  :
		  type === 'other' ?
		    <img src={petPin} alt="pin" />
		    :
		    <img src={pin} alt="pin" />
	  }
        </div>
      </div>
    )
  }
}
