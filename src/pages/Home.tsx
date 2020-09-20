import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'
import { User } from "firebase"
import Map from '../components/Map'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import IAnimal from '../interfaces/IAnimal'

interface IProps {
  viewport: ViewportProps
  animals: IAnimal[]
  isAddAnimal: boolean
  isSideOpen: false | IAnimal | 'add-animal'
  toggleIsAddAnimal: () => void
  toggleSide: (isSideOpen: false | IAnimal | 'add-animal') => void
  saveAnimal: (type: string, description: string, picture: string) => void
  cancelAnimal: () => void
  reportAnimal: (id: number, report: string) => void
  addAnimalMarker: (marker: MarkerProps) => void
  displayAnimal: (id: number) => void
  loggedUser: User | null
  isLoadingAnimals: boolean
}

interface IState {
  viewport: ViewportProps
}

export default class Home extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    const { viewport } = props
    this.state = { viewport }
  }

  setViewport = (viewport: ViewportProps) => this.setState({ viewport })
  
  render() {
    const { 
      animals, 
      isAddAnimal, 
      isSideOpen, 
      toggleIsAddAnimal, 
      toggleSide, 
      saveAnimal, 
      cancelAnimal, 
      reportAnimal, 
      addAnimalMarker, 
      displayAnimal, 
      loggedUser, 
      isLoadingAnimals 
    } = this.props
    const { viewport } = this.state
    
    return (<>
      <Navbar
        setViewport={this.setViewport} 
        toggleIsAddAnimal={toggleIsAddAnimal}
        isAddAnimal={isAddAnimal}
        isSideOpen={isSideOpen}
        loggedUser={loggedUser}
        isLoadingAnimals={isLoadingAnimals}
        />
      <div className="map-container">
        <Sidebar 
          isSideOpen={isSideOpen} 
          toggleSide={toggleSide} 
          saveAnimal={saveAnimal}
          cancelAnimal={cancelAnimal}
          reportAnimal={reportAnimal}
          />
        <Map 
          data-testid="map"
          viewport={viewport} 
          animals={animals} 
          addAnimalMarker={addAnimalMarker} 
          setViewport={this.setViewport} 
          isSideOpen={isSideOpen}
          displayAnimal={displayAnimal}
          />
      </div>
    </>
    )
  }
}
