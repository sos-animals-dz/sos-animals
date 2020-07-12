import React, { Component } from 'react'

interface IProps {
  width: number
  height: number
  searching: boolean
  borderColor: string
  borderTopColor: string
}

export default class Spinner extends Component<IProps> {
  render() {
    const { width, height, searching } = this.props
    return (<div style={{ width, height }}>
      <div style={searching ? { display: 'block' } : { display: 'none' }} className="spinner"></div>
    </div>)
  }
}
