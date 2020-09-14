import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { User as IUser } from 'firebase'
import { authState, getAnimals } from './firebase/utils'

import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import IAnimal from './interfaces/IAnimal'

interface IState {
  viewport: ViewportProps
  animals: IAnimal[]
  isAddAnimal: boolean
  isSideOpen: false | IAnimal | 'add-animal'
  loggedUser: IUser | null
}

export default class App extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        maxZoom: 22,
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
      loggedUser: null
    }
  }

  authStateListener:any = null
  componentDidMount () { 

    getAnimals()
      .then(animals => { this.setState({ animals }) })
      .catch(err => console.log("[!] Error@App.componentDidMount.getAnimals", err))

    this.authStateListener = authState((loggedUser: IUser | null) => this.setState({ loggedUser })) // add a loader in the login and Admin pages
  }

  componentWillUnmount () {
    this.authStateListener()
  }

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
    const { viewport, animals, isAddAnimal, isSideOpen, loggedUser } = this.state
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
      loggedUser={loggedUser}
      />
  }

  renderAdminPage = () => {
    const { loggedUser } = this.state
    if (!loggedUser) return <Redirect to="/login" />
    return <Admin />
  }
  
  renderLoginPage = () => {
    const { loggedUser } = this.state
    if (!loggedUser) return <Login />
    return <Redirect to="/" />
  }

  renderNotFoundPage = () => <NotFound />

  render() {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            <Route path="/" exact render={this.renderHomePage} />
            <Route path="/login" render={this.renderLoginPage} />
            <Route path="/admin" render={this.renderAdminPage} />
            <Route render={this.renderNotFoundPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}