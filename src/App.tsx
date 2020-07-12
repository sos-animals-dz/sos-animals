import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'

import Map from './components/Map'

interface IState {
  viewport: ViewportProps
  markers: MarkerProps[]
}

export default class App extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        zoom: 12,
        longitude: 3.04197,
        latitude: 36.7525
      },
      markers: []
    }
  }

  setViewport = (viewport: ViewportProps) => this.setState({ viewport })

  render() {
    return (
      <div className="app-container">
        <Map />
      </div>
    )
  }
}
