import React, { Component } from 'react'
import { deleteAnimal } from '../firebase/utils'

import IAnimal from '../interfaces/IAnimal'

import noImg from '../assets/no-img-available.jpg'
import birdIcon from '../assets/bird.svg'
import dogIcon from '../assets/dog.svg'
import catIcon from '../assets/cat.svg'
import petIcon from '../assets/pet.svg'
import deleteIcon from '../assets/delete.svg'

interface IProps {
  animal: IAnimal
  setToast: (isSuccess: boolean, message: string, isHidden: boolean) => void
  loadAnimals: ( callback?:() => void ) => void
}

export default class AnimalCard extends Component<IProps> {

  generateTypeIcon(type: string) {
    let icon
    switch (type.toLowerCase()) {
      case "dog":
        icon = dogIcon
        break;
      
      case "bird":
        icon = birdIcon
        break;
        
      case "cat":
        icon = catIcon
        break;
    
      default:
        icon = petIcon
        break;
    }

    return <img src={icon} alt={`${type} icon`} />
  }

  onDelete = (id: number) => {
    const isSure = window.confirm("Are you sure you want to delete this animal ?")
    if (isSure) {
      const { setToast, loadAnimals } = this.props
      deleteAnimal(id)
        .then(_ => {
          loadAnimals(() => setToast(true, "The Animal has been removed succesfully.", false))
        })
        .catch(err => {
          console.log("[!] Error@AnimalCard.onDelete:", err)
          setToast(false, "There was an error removing the animal.", true)
        })
    }
  }

  render() {
    const { animal: {id, type, picture, description, created_at, reports } } = this.props
    return (
      <div className="animal-card">
        <div className="animal-type">
          { this.generateTypeIcon(type) }
          <b>{type}</b>
          <p className="time">{ created_at.toLocaleString("en-US") }</p>
        </div>
        <div className="animal-picture">
          <img src={ picture ? picture : noImg } alt='the animal' />
        </div>
        <div className="animal-description">
          <b>description</b>
          <p>{description}</p>
        </div>
        <div className="animal-reports">
          {
            reports && reports.length > 0 ? 
              <>
                <b>reports: </b>
                {
                  reports.map((report, idx) => <p className="report" key={idx}>#{idx+1}: {report}</p>) 
                }
              </>
            :
              <p className="no-report">There is no report for this animal</p>
          }
        </div>
        <div className="animal-buttons">
          <button onClick={() => this.onDelete(id)} className="delete">
            <img src={deleteIcon} alt="trash can" />
          </button>
        </div>

      </div>
    )
  }
}
