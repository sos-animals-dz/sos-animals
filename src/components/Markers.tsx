import React, { Component } from 'react'
import { Marker } from 'react-map-gl'
import Pin from './Pin'
import IAnimal from '../interfaces/IAnimal'

interface IProps {
  animals: IAnimal[]
  displayAnimal: (id: number) => void
}

export default class Markers extends Component<IProps> {
  render() {
    const { animals, displayAnimal } = this.props
    return (
      <div className="markers-container">
        {
          animals.map(({marker, id, type}) => (
            <Marker 
              key={id}
              longitude={ marker.longitude }
              latitude={ marker.latitude }
              >
                <Pin id={id} type={type} displayAnimal={displayAnimal} />
            </Marker>
          ))
        }
      </div>
    )
  }
}
