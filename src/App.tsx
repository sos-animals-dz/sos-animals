import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Admin from './pages/Admin'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import IAnimal from './interfaces/IAnimal'
import Home from './pages/Home'

interface IState {
  viewport: ViewportProps
  animals: IAnimal[]
  isAddAnimal: boolean
  isSideOpen: false | IAnimal | 'add-animal'
  isLogged: boolean
}

export default class App extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        maxZoom: 15,
        minZoom: 8,
        zoom: 12,
        longitude: 3.04197,
        latitude: 36.7525,
        bearing: 0,
        pitch: 10,
        altitude: 0,
        maxPitch: 60,
        minPitch: 0
      },
      animals: [],
      isAddAnimal: false,
      isSideOpen: false,
      isLogged: false
    }
  }

  componentDidMount () { /* check is user logged */ }

  addAnimalMarker = (marker: MarkerProps) => {
    const { isAddAnimal } = this.state
    if (isAddAnimal) {
      this.setState((state) => ({ isAddAnimal: false, animals: [...state.animals, { id: new Date().getTime(), type: "", description: "", marker }], isSideOpen: 'add-animal' }))
    }
  }

  removeMarker = (id: number) => { return; } // this.setState((state) => ({ animals: [...state.animals.filter((animal) => animal.id !== id)] })) // THIS IS AN ADMIN/BOT FUNCTIONALITY TO BE ADDED LATER.
  
  toggleIsAddAnimal = () => this.setState((state) => ({ isAddAnimal: !state.isAddAnimal }))

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

  reportAnimal = (id: number, report: string) => {
    const { animals } = this.state
    let reported = animals.map(animal => {
      if (animal.id === id) {
        if (animal.reports) animal.reports = [ ...animal.reports, report ]
        else animal.reports= [ report ]
      }
      return animal
    })

    this.setState({animals: reported})
  }

  renderHomePage = () => {
    const { viewport, animals, isAddAnimal, isSideOpen } = this.state
    return <Home 
      viewport={viewport} 
      animals={animals} 
      isAddAnimal={isAddAnimal} 
      isSideOpen={isSideOpen} 
      toggleIsAddAnimal={this.toggleIsAddAnimal}
      toggleSide={this.toggleSide}
      saveAnimal={this.saveAnimal}
      cancelAnimal={this.cancelAnimal}
      reportAnimal={this.reportAnimal}
      addAnimalMarker={this.addAnimalMarker}
      removeMarker={this.removeMarker}
      displayAnimal={this.displayAnimal}
      />
  }

  renderAdminPage = () => {
    const { isLogged } = this.state
    if (isLogged) return <Admin />
    return <Login />
  }
  
  renderLoginPage = () => {
    const { isLogged } = this.state
    if (isLogged) return <Admin />
    return <Login />
  }

  renderNotFoundPage = () => <NotFound />

  render() {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            <Route path="/" exact render={this.renderHomePage} />
            <Route path="/portal" render={this.renderLoginPage} />
            <Route path="/admin" render={this.renderAdminPage} />
            <Route render={this.renderNotFoundPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}