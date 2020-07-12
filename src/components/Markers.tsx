import React, { Component } from 'react'
import { Marker, MarkerProps } from 'react-map-gl'
import Pin from './Pin'

interface IProps {
  markers: MarkerProps[]
}

export default class Markers extends Component<IProps> {
  render() {
    const { markers } = this.props
    return (
      <div className="markers-container">
        {
          markers.map(({longitude, latitude}: MarkerProps, index:number) => (
            <Marker 
              key={index}
              longitude={ longitude }
              latitude={ latitude }
              >
                <Pin index={index} />
            </Marker>
          ))
        }
      </div>
    )
  }
}
