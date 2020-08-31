import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'
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
  removeMarker: (id: number) => void
  displayAnimal: (id: number) => void
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
    const { animals, isAddAnimal, isSideOpen, toggleIsAddAnimal, toggleSide, saveAnimal, cancelAnimal, reportAnimal, addAnimalMarker, removeMarker, displayAnimal } = this.props
    const { viewport } = this.state
    
    return (<>
      <Navbar
        setViewport={this.setViewport} 
        toggleIsAddAnimal={toggleIsAddAnimal}
        isAddAnimal={isAddAnimal}
        isSideOpen={isSideOpen}
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
          removeMarker={removeMarker}
          setViewport={this.setViewport} 
          isSideOpen={isSideOpen}
          displayAnimal={displayAnimal}
          />
      </div>
    </>
    )
  }
}
