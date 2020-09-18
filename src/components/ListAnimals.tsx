import React, { Component } from 'react'

import AnimalCard from './AnimalCard'

import IAnimal from '../interfaces/IAnimal'

interface IProps {
  animals: IAnimal[]
  setToast: (isSuccess: boolean, message: string, isHidden: boolean) => void
  loadAnimals: ( callback?:() => void ) => void
} 
export default class ListAnimals extends Component<IProps> {
  render() {
    const { animals, setToast, loadAnimals } = this.props
    return (
      <div className="animals-list">
        <h2>List of all animals :</h2>
        { 
          animals.map(animal => <AnimalCard 
            key={animal.id} 
            animal={animal} 
            setToast={setToast}
            loadAnimals={loadAnimals}
          />) 
        }
      </div>
    )
  }
}
