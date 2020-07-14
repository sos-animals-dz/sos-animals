import React, { Component, ChangeEvent } from 'react'

import addPicture from '../assets/add-picture.svg'
import close from '../assets/close.svg'

interface IState {
  type: string
  description: string
  picture: string
}

export default class AddAnimal extends Component<unknown, IState> {

  constructor(props: unknown) {
    super(props)
    this.state = {
      type: "",
      description: "",
      picture: ""
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
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() { 
      if (reader.result) setImageToState(reader.result.toString())
    }
  }

  setImageToState = (picture: string) => this.setState({picture})

  removePicture = () => this.setImageToState("")

  savePin = () => console.log("saved ...")

  closeSidebar = () => console.log("closed ...")

  render() {
    const { type, description, picture } = this.state

    return (
      <div className="add-animal-container">
        <div className="header">
          <h2>Add a new animal</h2>
        </div>
        <div className="form-animal">
          <div className="input-form">
            <label>Animal's type <span className="red">*</span></label>
            <select onChange={this.onInputChange} name="type" value={type}>
              <option>Bird</option>
              <option>Cat</option>
              <option>Dog</option>
              <option>Other</option>
            </select>
          </div>
          <div className="input-form">
            <label>Add a description <span className="red">*</span></label>
            <textarea onChange={this.onInputChange} name="description" value={description} placeholder="Add a description"></textarea>
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
                <div className="add-picture">
                  <img src={addPicture} alt='upload__picture' />
                </div>
                <input 
                  className="input-picture" 
                  type="file" 
                  accept="image/x-png,image/jpeg" 
                  onChange={this.uploadPicture}
                  />
              </div>
            }
          </div>
        </div>
        <div className="footer">
            <button onClick={this.savePin}>save</button>
            <button onClick={this.closeSidebar}>cancel</button>
        </div>
      </div>
    )
  }
}