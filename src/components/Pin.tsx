import React, { Component } from 'react'
import pin from '../assets/pin.svg'
import IAnimal from '../interfaces/IAnimal'

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

  // add spatail pins (dog, cat, bird)
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
          <img src={pin} alt='pin' />
        </div>
      </div>
    )
  }
}
