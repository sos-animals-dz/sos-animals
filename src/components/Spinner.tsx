import React, { Component } from 'react'

interface IProps {
  width: number
  height: number
  laoding: boolean
  borderColor: string
  borderTopColor: string
}

export default class Spinner extends Component<IProps> {
  render() {
    const { width, height, laoding } = this.props
    return (<div style={{ width, height }}>
      <div style={laoding ? { display: 'block' } : { display: 'none' }} className="spinner"></div>
    </div>)
  }
}
