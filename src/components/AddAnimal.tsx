import React, { Component, ChangeEvent } from 'react';

import addPicture from '../assets/svg/add-picture.svg';
import close from '../assets/svg/close.svg';
import IAnimal from '../interfaces/IAnimal';

interface IState {
  type: string;
  description: string;
  picture: string;
  error: { type?: boolean; description?: boolean; picture?: boolean };
}

interface IProps {
  toggleSide: (isSideOpen: false | IAnimal | 'add-animal') => void;
  saveAnimal: (type: string, description: string, picture: string) => void;
  cancelAnimal: () => void;
}

export default class AddAnimal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      type: '',
      description: '',
      picture: '',
      error: { type: false, description: false, picture: false },
    };
  }

  onInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (e.currentTarget.name === 'type') {
      this.setState({ type: value });
    } else {
      this.setState({ description: value });
    }
  };

  uploadPicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) this.uploadImage(e.target.files, this.setImageToState);
  };

  uploadImage = (
    files: FileList,
    setImageToState: (images: string) => void
  ) => {
    const file = files[0];
    if (file.size > 1000000) {
      this.setState(
        (state) => ({
          picture: '',
          error: {
            ...state.error,
            picture: true,
          },
        }),
        () =>
          setTimeout(() => {
            this.setState({
              error: {
                type: false,
                description: false,
              },
            });
          }, 4000)
      );
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        if (reader.result) setImageToState(reader.result.toString());
      };
    }
  };

  setImageToState = (picture: string) => this.setState({ picture });

  removePicture = () => this.setImageToState('');

  saveAnimal = () => {
    const { saveAnimal } = this.props;
    const { type, description, picture } = this.state;

    if (this.validateInput(type, description)) {
      saveAnimal(type, description, picture);
    }
  };

  closeSidebar = () => {
    const { toggleSide, cancelAnimal } = this.props;
    cancelAnimal();
    this.setState({ type: '', description: '', picture: '' }, () =>
      toggleSide(false)
    );
  };

  validateInput = (type: string, description: string) => {
    const error = { type: false, description: false };

    if (type === '') error.type = true;
    if (description.length < 20) error.description = true;

    this.setState(
      (state) => ({
        error: { ...state.error, ...error },
      }),
      () =>
        setTimeout(
          () =>
            this.setState({
              error: { type: false, description: false },
            }),
          4000
        )
    );

    if (error.type || error.description) return false;
    return true;
  };

  render() {
    const { type, description, picture, error } = this.state;

    return (
      <div className="add-animal-container">
        <div className="header">
          <h2>Add a new animal</h2>
        </div>
        <div className="form-animal">
          <div className="input-form">
            <label htmlFor="type">
              Animal&apos;s type{' '}
              <span className="red" title="Required field">
                *
              </span>
            </label>
            <select
              id="type"
              onChange={this.onInputChange}
              name="type"
              value={type}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Bird">Bird</option>
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
              <option value="Other">Other</option>
            </select>
            {error.type && (
              <p className="error">Please select the animal&apos;s type.</p>
            )}
          </div>
          <div className="input-form">
            <label htmlFor="description">
              Add a description{' '}
              <span className="red" title="Required field">
                *
              </span>
            </label>
            <textarea
              id="description"
              onChange={this.onInputChange}
              name="description"
              value={description}
              placeholder="Add a description of the animal and how can we help."
            />
            {error.description && (
              <p className="error">
                Please add a description (at least 20 character).
              </p>
            )}
          </div>
          <div className="input-form">
            <label htmlFor="animal-picture">Add a picture</label>
            {picture ? (
              <div className="preview-picture">
                <button type="button" onClick={this.removePicture}>
                  <img src={close} alt="close button" />
                </button>
                <div className="picture">
                  <img src={picture} alt="animal preview" />
                </div>
              </div>
            ) : (
              <div className="add-file">
                <button type="button" className="add-picture">
                  the animal&apos;s pic
                  <img src={addPicture} alt="upload__picture" />
                </button>
                <input
                  id="animal-picture"
                  className="input-picture"
                  type="file"
                  accept="image/x-png,image/jpeg"
                  onChange={this.uploadPicture}
                />
              </div>
            )}
            {error.picture && (
              <p className="error">
                Sorry, the picture size must be less then 1 Mb.
              </p>
            )}
          </div>
        </div>
        <div className="footer">
          <button type="button" className="save" onClick={this.saveAnimal}>
            save
          </button>
          <button type="button" className="cancel" onClick={this.closeSidebar}>
            cancel
          </button>
        </div>
      </div>
    );
  }
}
