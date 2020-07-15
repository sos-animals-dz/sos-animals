import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'

import Map from './components/Map'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import IAnimal from './interfaces/IAnimal'

interface IState {
  viewport: ViewportProps
  animals: IAnimal[]
  isAddAnimal: boolean
  isSideOpen: false | IAnimal | 'add-animal'
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
      animals: [],
      isAddAnimal: false,
      isSideOpen: false
    }
  }

  setViewport = (viewport: ViewportProps) => this.setState({ viewport })

  addAnimalMarker = (marker: MarkerProps) => {
    const { isAddAnimal } = this.state
    if (isAddAnimal) {
      this.setState((state) => ({ isAddAnimal: false, animals: [...state.animals, { id: new Date().getTime(), type: "", description: "", marker }], isSideOpen: 'add-animal' }))
    }
  }

  removeMarker = (id: number) => {} // this.setState((state) => ({ animals: [...state.animals.filter((animal) => animal.id !== id)] })) // THIS IS AN ADMIN/BOT FUNCTIONALITY TO BE ADDED LATER.
  
  toggleIsAddAnimal = () => {
    this.setState((state) => ({ isAddAnimal: !state.isAddAnimal }))
  }

  saveAnimal = (type: string, description: string, picture: string) => {
    let { animals } = this.state
    animals[animals.length - 1].description = description
    animals[animals.length - 1].type = type
    if( picture ) animals[animals.length - 1].picture = picture

    this.setState({ animals}, () => {
      // display success message then hide the form
      this.toggleSide(false)
    })
  }

  cancelAnimal = () => {
    this.setState((state) => ({ animals: [...state.animals.slice(0, state.animals.length - 2)] }))
  }

  toggleSide = (isSideOpen: false | IAnimal | 'add-animal') => this.setState({isSideOpen})

  displayAnimal = (id: number) => {
    const { animals } = this.state
    const animal = animals.filter(animal => animal.id === id)[0]
    this.toggleSide(animal)
  }

  reportAnimal = (id: number) => {
    const { animals } = this.state
    let reported = animals.map(animal => {
      if (animal.id === id) {
        animal.reports = animal.reports ? animal.reports + 1 : 0
      }
      return animal
    })

    this.setState({animals: reported})
  }

  render() {
    const { viewport, animals, isAddAnimal, isSideOpen } = this.state
    return (
      <div className="app-container">
        <Navbar
          setViewport={this.setViewport} 
          toggleIsAddAnimal={this.toggleIsAddAnimal}
          isAddAnimal={isAddAnimal}
          isSideOpen={isSideOpen}
          />
        <div className="map-container">
          <Sidebar 
            isSideOpen={isSideOpen} 
            toggleSide={this.toggleSide} 
            saveAnimal={this.saveAnimal}
            cancelAnimal={this.cancelAnimal}
            reportAnimal={this.reportAnimal}
            />
          <Map 
            viewport={viewport} 
            animals={animals} 
            addAnimalMarker={this.addAnimalMarker} 
            removeMarker={this.removeMarker}
            setViewport={this.setViewport} 
            isSideOpen={isSideOpen}
            displayAnimal={this.displayAnimal}
            />
        </div>
      </div>
    )
  }
}
