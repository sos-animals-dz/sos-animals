import React, { Component } from 'react';
import { ViewportProps } from 'react-map-gl';
import { User as IUser } from 'firebase';
import { Link } from 'react-router-dom';

import Search from './Search';
import User from './User';
import Spinner from './Spinner';

import IAnimal from '../interfaces/IAnimal';

import logo from '../assets/logo-white.png';
import add from '../assets/jpeg/add.jpg';
import addActive from '../assets/jpeg/add-active.jpg';
import homeIcon from '../assets/svg/home.svg';
import usageIcon from '../assets/svg/usage.svg';

interface IProps {
  isAddAnimal?: boolean;
  isSideOpen?: false | IAnimal | 'add-animal';
  loggedUser: IUser | null;
  isAdmin?: boolean;
  allowBack?: boolean;
  allowAdd?: boolean;
  isLoadingAnimals: boolean;
  setViewport?: (viewport: ViewportProps) => void;
  toggleIsAddAnimal?: () => void;
}

interface IState {
  isFirstTime: boolean;
}

const asyncLS = {
  setItem(key: string, value: any) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem(key: string) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
};

export default class Navbar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isFirstTime: false };
  }

  componentDidMount() {
    asyncLS.getItem('alreadyHaveBeenHere').then((res) => {
      if (!res) {
        this.setState({ isFirstTime: true });
      }
    });
  }

  onAddAnimalClick = () => {
    const { isSideOpen, toggleIsAddAnimal } = this.props;
    if (isSideOpen !== 'add-animal' && toggleIsAddAnimal) {
      toggleIsAddAnimal();
    }
  };

  render() {
    const {
      setViewport,
      isAddAnimal,
      loggedUser,
      isAdmin,
      allowBack,
      allowAdd,
      isLoadingAnimals,
    } = this.props;

    const { isFirstTime } = this.state;

    return (
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="SOS Animal" />
          </Link>
        </div>
        {isLoadingAnimals && (
          <Spinner
            laoding={isLoadingAnimals}
            width={20}
            height={20}
            borderColor="#fafbfc"
            borderTopColor="transparent"
          />
        )}

        {allowAdd && (
          <>
            <button
              type="button"
              title={`${
                isAddAnimal ? 'disable add-animal' : 'enable add-animal'
              }`}
              className={`add-animal ${isAddAnimal ? 'active' : ''}`}
              onClick={this.onAddAnimalClick}
            >
              {isAddAnimal ? (
                <img src={addActive} alt="add animal" />
              ) : (
                <img src={add} alt="add animal" />
              )}
            </button>
            {setViewport && <Search setViewport={setViewport} />}
          </>
        )}

        {loggedUser ? (
          <User isAdmin={isAdmin} />
        ) : (
          <Link
            onClick={() => {
              if (isFirstTime) asyncLS.setItem('alreadyHaveBeenHere', false);
            }}
            className="usage-link"
            to="/usage"
          >
            {isFirstTime ? (
              <div className="first-time">
                <img src={usageIcon} alt="usage" title="how to use the app" />
                <span>Please read the usage guide</span>
              </div>
            ) : (
              <img src={usageIcon} alt="usage" title="how to use the app" />
            )}
          </Link>
        )}

        {allowBack && (
          <Link className="home-link" to="/">
            <img src={homeIcon} alt="home" title="go home page" />
          </Link>
        )}
      </div>
    );
  }
}
