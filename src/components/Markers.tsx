import React, { Component } from 'react'
import { Marker } from 'react-map-gl'
import Pin from './Pin'
import IAnimal from '../interfaces/IAnimal'

interface IProps {
  animals: IAnimal[]
}

export default class Markers extends Component<IProps> {
  render() {
    const { animals } = this.props
    return (
      <div className="markers-container">
        {
          animals.map(({marker, id }) => (
            <Marker 
              key={id}
              longitude={ marker.longitude }
              latitude={ marker.latitude }
              >
                <Pin id={id} />
            </Marker>
          ))
        }
      </div>
    )
  }
}
