import React, { Component } from 'react'

import ListAnimals from '../components/ListAnimals'
import Navbar from '../components/Navbar'

import IAnimal from '../interfaces/IAnimal'
import { User as IUser } from "firebase"

interface IProps {
  animals: IAnimal[]
  loggedUser: IUser
  isLoadingAnimals: boolean
  setToast: (isSuccess: boolean, message: string, isHidden: boolean) => void
  loadAnimals: ( callback?:() => void ) => void
}

export default class Admin extends Component<IProps> {
  render() {
    const { animals, isLoadingAnimals, loggedUser, setToast, loadAnimals } = this.props
    return (
      <div className="admin-container">
        <Navbar isLoadingAnimals={isLoadingAnimals} loggedUser={loggedUser} isAdmin />
        <div className="dashboard">
          <ListAnimals 
            setToast={setToast} 
            animals={animals} 
            loadAnimals={loadAnimals}
            />
        </div>
      </div>
    )
  }
}
