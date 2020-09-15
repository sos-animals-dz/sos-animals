import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { User as IUser } from 'firebase'
import { authState, getAnimals, setAnimal } from './firebase/utils'

import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import IAnimal from './interfaces/IAnimal'
import Toast from './components/Toast';

interface IState {
  viewport: ViewportProps
  animals: IAnimal[]
  isAddAnimal: boolean
  isSideOpen: false | IAnimal | 'add-animal'
  loggedUser: IUser | null
  isLoadingAnimals: boolean
  toast: { isSuccess: boolean, message: string, isHidden: boolean }
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
      loggedUser: null,
      isLoadingAnimals: true,
      toast: { 
        isSuccess: false, 
        message: "", 
        isHidden: true
      }
    }
  }

  authStateListener:any = null
  componentDidMount () { 
    try {
      getAnimals()
        .then(animals => { 
          this.setState({ 
            animals, 
            isLoadingAnimals: false
          })
        })
        .catch(err => {
          console.log("[!] Error@App.componentDidMount.getAnimals", err)
          this.setState({ 
            toast: { 
              isSuccess: false, 
              isHidden: false, 
              message:"Sorry! We couldn't load the data, please check your internet connection then reload the page." 
            } 
          })
        })
      this.authStateListener = authState((loggedUser: IUser | null) => {
        this.setState({ loggedUser })
      })
    } catch (err) {
      console.log(err)
      this.setState({ 
        toast: { 
          isSuccess: false, 
          isHidden: false, 
          message:"Sorry! We couldn't load the data, please check your internet connection then reload the page." 
        } 
      })
    }
  }

  componentWillUnmount () {
    this.authStateListener()
  }

  addAnimalMarker = (marker: MarkerProps) => {
    const { isAddAnimal } = this.state
    if (isAddAnimal) {
      this.setState((state) => ({ 
          isAddAnimal: false, 
          animals: [{ id: 0, type: "", description: "", marker }, ...state.animals], 
          isSideOpen: 'add-animal' 
        })
      )
    }
  }

  removeMarker = (id: number) => { return; } // this.setState((state) => ({ animals: [...state.animals.filter((animal) => animal.id !== id)] })) // THIS IS AN ADMIN/BOT FUNCTIONALITY TO BE ADDED LATER.
  
  toggleIsAddAnimal = () => {
    this.setState((state) => ({ isAddAnimal: !state.isAddAnimal }))
  }

  saveAnimal = (type: string, description: string, picture: string) => {
    const { animals } = this.state
    setAnimal({ 
        id: new Date().getTime(), 
        type, 
        description, 
        picture, 
        marker: animals[0].marker, 
        reports: [], 
        created_at: new Date()
      }).then((res) => { 
        this.setState({ isLoadingAnimals: true }, () => {
          getAnimals()
            .then(animals => { 
              this.setState({ animals }, () => {
                this.setState({ 
                  isSideOpen: false, 
                  isLoadingAnimals: false,
                  toast: { 
                    isSuccess: true, 
                    message: "The animal has been successfully added.", 
                    isHidden: false 
                  }
                })
              }) 
            })
            .catch(err => { 
              console.log("[!] Error@App.saveAnimal.setAnimal.getAnimals", err) 
              this.setState({ 
                toast: { 
                  isSuccess: false, 
                  isHidden: false, 
                  message:"Sorry! We couldn't load the data, please check your internet connection then try again." 
                } 
              })
            })
        })        
      })
      .catch(err => { 
        console.log("[!] Error@App.saveAnimal.setAnimal", err)
        this.setState({ 
          toast: { 
            isSuccess: false, 
            isHidden: false, 
            message:"Sorry! We couldn't save the animal data, please check your internet connection then try again." 
          } 
        })
      })
  }

  cancelAnimal = () => {
    this.setState((state) => ({ animals: [...state.animals.slice(1, state.animals.length - 1)] }))
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
    const { viewport, animals, isAddAnimal, isSideOpen, loggedUser, isLoadingAnimals } = this.state
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
      isLoadingAnimals={isLoadingAnimals}
      />
  }

  setLoadingAnimals = (isLoadingAnimals: boolean) => this.setState({ isLoadingAnimals })

  renderAdminPage = () => {
    const { loggedUser, isLoadingAnimals } = this.state
    if (!loggedUser) return <Redirect to="/login" />
    return <Admin isLoadingAnimals={isLoadingAnimals} />
  }
  
  renderLoginPage = () => {
    const { loggedUser } = this.state
    if (!loggedUser) return <Login />
    return <Redirect to="/" />
  }

  renderNotFoundPage = () => <NotFound />

  hideToast = () => {
    this.setState(({ toast }) => ({ toast: { ...toast, isHidden: true} }))
  }

  render() {
    const { toast } = this.state
    return (
      <div className="app-container">
        <Toast { ...toast } hideToast={this.hideToast} />
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