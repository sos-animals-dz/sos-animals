import React, { Component, ChangeEvent } from 'react'

import addPicture from '../assets/add-picture.svg'
import close from '../assets/close.svg'
import IAnimal from '../interfaces/IAnimal'

interface IState {
  type: string
  description: string
  picture: string
  error: { type?: boolean, description?: boolean, picture?: boolean }
}

interface IProps {
  toggleSide: (isSideOpen: false | IAnimal | 'add-animal') => void
  saveAnimal: (type: string, description: string, picture: string) => void
  cancelAnimal: () => void
}

export default class AddAnimal extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      type: "",
      description: "",
      picture: "",
      error: { type: false, description: false, picture: false }
    }
  }

  onInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.currentTarget.value
    e.currentTarget.name === 'type' ? this.setState({ type: value }) : this.setState({ description: value })     
  }
  
  uploadPicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) this.uploadImage(e.target.files, this.setImageToState)
  }

  uploadImage = (files: FileList, setImageToState: (images: string) => void ) => {
    const file = files[0]
    if (file.size > 1000000) {
      this.setState((state) => ({ 
        picture: "",
        error: { ...state.error, picture: true } 
      }), () => setTimeout(() => this.setState({ 
        error: { type: false, description: false} 
      }), 4000))
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() { 
        if (reader.result) setImageToState(reader.result.toString())
      }
    }
  }

  setImageToState = (picture: string) => this.setState({picture})

  removePicture = () => this.setImageToState("")

  saveAnimal = () =>{
    const { saveAnimal } = this.props
    const { type, description, picture } = this.state

    if (this.validateInput(type, description)) {
      saveAnimal(type, description, picture)
      this.setState({type: "", description: "", picture: ""})
    }
  }

  closeSidebar = () => {
    const { toggleSide, cancelAnimal } = this.props
    cancelAnimal()
    this.setState({ type: "", description: "", picture: "" }, () => toggleSide(false))
  }

  validateInput = (type: string, description: string) => {
    const error = { type: false, description: false }

    if (type === "") error.type = true
    if (description.length < 20) error.description = true

    this.setState((state) => ({ 
      error: { ...state.error, ...error } 
    }), () => setTimeout(() => this.setState({ 
      error: { type: false, description: false} 
    }), 4000))

    if (error.type || error.description) return false
    else return true
  }

  render() {
    const { type, description, picture, error } = this.state

    return (
      <div className="add-animal-container">
        <div className="header">
          <h2>Add a new animal</h2>
        </div>
        <div className="form-animal">
          <div className="input-form">
            <label>Animal's type <span className="red" title="Required field">*</span></label>
            <select onChange={this.onInputChange} name="type" value={type}>
              <option value="" disabled>Select type</option>
              <option value="Bird">Bird</option>
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
              <option value="Other">Other</option>
            </select>
          { error.type && <p className="error">Please select the animal's type.</p> }        
          </div>
          <div className="input-form">
            <label>Add a description <span className="red" title="Required field">*</span></label>
            <textarea 
              onChange={this.onInputChange} 
              name="description" value={description} 
              placeholder="Add a description of the animal and how can we help.">
            </textarea>
          { error.description && <p className="error">Please add a description (at least 20 character).</p> }            
          </div>
          <div className="input-form">
            <label>Add a picture</label>
            { 
              picture ?
              <div className="preview-picture">
                <button onClick={this.removePicture}>
                  <img src={close} alt='close button' />
                </button>
                <div className="picture">
                  <img src={picture} alt="animal preview" />
                </div>
              </div>
              :
              <div className="add-file">
                <button className="add-picture">
                  the animal's pic
                  <img src={addPicture} alt='upload__picture' />
                </button>
                <input 
                  className="input-picture" 
                  type="file" 
                  accept="image/x-png,image/jpeg" 
                  onChange={this.uploadPicture}
                  />
              </div>
            }
            { error.picture && <p className="error">Sorry, the picture size must be less then 1 Mb.</p> }
          </div>
        </div>
        <div className="footer">
            <button className="save" onClick={this.saveAnimal}>save</button>
            <button className="cancel" onClick={this.closeSidebar}>cancel</button>
        </div>
      </div>
    )
  }
}
