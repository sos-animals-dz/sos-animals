import React, { Component } from 'react'
import pin from '../assets/pin.svg'

interface IProps {
  id: number
}

export default class Pin extends Component<IProps> {

  onPinClick = (id: number) => {
    console.log(id)
    // display infos
  }

  render() {
    const { id } = this.props
    return (
      <div className="pin-container">
        <div onClick={() => this.onPinClick(id)} className="pin" style={{ position: 'relative', cursor: 'pointer'}}>
          <img src={pin} alt='pin' style={{ position: 'absolute', top: '-50%' }} />
        </div>
      </div>
    )
  }
}
