import React, { Component } from 'react'
import pin from '../assets/pin.svg'

interface IProps {
  id: number
  type: string
  displayAnimal: (id: number) => void
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

  onPinClick = () => this.setState({ showType: true }, () => setTimeout(() => this.setState({showType: false}), 2000))

  onPinDoubleClick = () => {
    // display infos
  }

  // add spatail pins (dog, cat, bird)
  render() {
    const { id, type, displayAnimal } = this.props
    const { showType } = this.state
    return (
      <div className="pin-container">
        {
          showType && <div className="show-type">
            <p>{ type }</p>
          </div>
        }
        <div onDoubleClick={() => displayAnimal(id)} onClick={() => this.onPinClick()} className="pin">
          <img src={pin} alt='pin' />
        </div>
      </div>
    )
  }
}
