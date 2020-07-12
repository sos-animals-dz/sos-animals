import React, { Component } from 'react'
import pin from '../assets/pin.png'

interface IProps {
  index: number
}

export default class Pin extends Component<IProps> {

  onPinClick = (index: number) => {
    console.log(index)
  }

  render() {
    const { index } = this.props
    return (
      <div className="pin-container">
        <div onClick={() => this.onPinClick(index)} className="pin" style={{ position: 'relative', cursor: 'pointer'}}>
          <img src={pin} alt='pin' style={{ position: 'absolute', top: '-50%' }} />
        </div>
      </div>
    )
  }
}
