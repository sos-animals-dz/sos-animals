import React, { Component } from 'react'
import IAnimal from '../interfaces/IAnimal'

import noImage from '../assets/no-img-available.jpg'

interface IProps {
  animal: IAnimal
  toggleSide: (isSideOpen: false | IAnimal | 'add-animal') => void
  reportAnimal: (id: number) => void
}

export default class DisplayAnimal extends Component<IProps> {
  render() {
    const { animal: { type, picture, description, id }, toggleSide, reportAnimal } = this.props
    return (
      <div className="display-animal-container">
        <div className="animal-type">
          <h3>{type}</h3>
        </div>
        <div className="animal-picture">
          {
            picture ?
              <img src={picture} alt='animal' />
              : 
              <img src={noImage} alt='no animal' />
          }
        </div>
        <div className="animal-description">
          <h4>description: </h4>
          <p>{description}</p>
        </div>
        <div className="footer">
          <button className="close" onClick={() => toggleSide(false)}>close</button>
          <button className="report" onClick={() => reportAnimal(id)}>report</button>
        </div>
      </div>
    )
  }
}
