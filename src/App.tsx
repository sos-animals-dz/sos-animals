import React, { Component } from 'react';
import { ViewportProps, MarkerProps } from 'react-map-gl';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { User as IUser } from 'firebase';
import { authState, getAnimals, setAnimal } from './firebase/utils';

import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import IAnimal from './interfaces/IAnimal';
import Toast from './components/Toast';

interface IState {
  viewport: ViewportProps;
  animals: IAnimal[];
  isAddAnimal: boolean;
  isSideOpen: false | IAnimal | 'add-animal';
  loggedUser: IUser | null;
  isLoadingAnimals: boolean;
  toast: { isSuccess: boolean; message: string; isHidden: boolean };
}

export default class App extends Component<any, IState> {
  authStateListener: any = null;

  constructor(props: any) {
    super(props);
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
        minPitch: 0,
      },
      animals: [],
      isAddAnimal: false,
      isSideOpen: false,
      loggedUser: null,
      isLoadingAnimals: true,
      toast: {
        isSuccess: false,
        message: '',
        isHidden: true,
      },
    };
  }

  componentDidMount() {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) this.setState({ loggedUser: JSON.parse(loggedUser) });

    try {
      this.loadAnimals();
    } catch (err) {
      this.setState({
        toast: {
          isSuccess: false,
          isHidden: false,
          message:
            "Sorry! We couldn't load the data, please check your internet connection then reload the page.",
        },
      });
    }
  }

  componentWillUnmount() {
    this.authStateListener();
  }

  addAnimalMarker = (marker: MarkerProps) => {
    const { isAddAnimal } = this.state;
    if (isAddAnimal) {
      this.setState((state) => ({
        isAddAnimal: false,
        animals: [
          { id: 0, type: '', description: '', marker, created_at: new Date() },
          ...state.animals,
        ],
        isSideOpen: 'add-animal',
      }));
    }
  };

  toggleIsAddAnimal = () => {
    this.setState((state) => ({ isAddAnimal: !state.isAddAnimal }));
  };

  saveAnimal = (type: string, description: string, picture: string) => {
    const { animals } = this.state;
    this.setState({ isLoadingAnimals: true });

    setAnimal({
      id: new Date().getTime(),
      type,
      description,
      picture,
      marker: animals[0].marker,
      reports: [],
      created_at: new Date(),
    })
      .then(() => {
        this.loadAnimals(() => {
          this.setState({ isSideOpen: false, isLoadingAnimals: false }, () =>
            this.setToast(true, 'The animal was pinned successfully', false)
          );
        });
      })
      .catch((err) => {
        console.log('[!] Error@App.saveAnimal.setAnimal', err);
        this.setState({
          toast: {
            isSuccess: false,
            isHidden: false,
            message:
              "Sorry! We couldn't save the animal data, please check your internet connection then try again.",
          },
          isLoadingAnimals: false,
        });
      });
  };

  loadAnimals = (callback?: () => void) => {
    this.setState({ isLoadingAnimals: true });

    getAnimals()
      .then((res) => {
        if (res === 'internet-error') {
          this.setState({
            toast: {
              isSuccess: false,
              message:
                'Unable to load the animals list, Please check your internet connection and try again.',
              isHidden: false,
            },
            isLoadingAnimals: false,
          });
        } else {
          this.setState(
            {
              animals: res,
              isLoadingAnimals: false,
            },
            callback
          );
        }
      })
      .catch((err) => {
        console.log('[!] Error@App.componentDidMount.getAnimals', err);
        this.setState({
          toast: {
            isSuccess: false,
            isHidden: false,
            message:
              "Sorry! We couldn't load the data, please check your internet connection then reload the page.",
          },
          isLoadingAnimals: false,
        });
      });

    this.authStateListener = authState((loggedUser: IUser | null) => {
      this.setState({ loggedUser });
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    });
  };

  cancelAnimal = () => {
    this.setState((state) => ({
      animals: [...state.animals.slice(1, state.animals.length - 1)],
    }));
  };

  toggleSide = (isSideOpen: false | IAnimal | 'add-animal') => {
    this.setState({ isSideOpen });
  };

  displayAnimal = (id: number) => {
    const { animals } = this.state;
    const animal = animals.filter((anml) => anml.id === id)[0];
    this.toggleSide(animal);
  };

  reportAnimal = (id: number, report: string) => {
    const { animals } = this.state;
    const animal = animals.filter((anml) => anml.id === id)[0];
    if (animal.reports) {
      animal.reports.push(report);
      setAnimal(animal);
    } else {
      this.setState({
        toast: {
          isSuccess: false,
          isHidden: false,
          message:
            "Sorry! We couldn't save the report, please reload the page and try again.",
        },
      });
    }
  };

  renderHomePage = () => {
    const {
      viewport,
      animals,
      isAddAnimal,
      isSideOpen,
      loggedUser,
      isLoadingAnimals,
    } = this.state;
    return (
      <Home
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
        displayAnimal={this.displayAnimal}
        loggedUser={loggedUser}
        isLoadingAnimals={isLoadingAnimals}
      />
    );
  };

  setLoadingAnimals = (isLoadingAnimals: boolean) =>
    this.setState({ isLoadingAnimals });

  renderAdminPage = () => {
    const { animals, loggedUser, isLoadingAnimals } = this.state;
    if (!loggedUser) return <Redirect to="/login" />;
    return (
      <Admin
        animals={animals}
        loggedUser={loggedUser}
        isLoadingAnimals={isLoadingAnimals}
        setToast={this.setToast}
        loadAnimals={this.loadAnimals}
      />
    );
  };

  renderLoginPage = () => {
    const { loggedUser } = this.state;
    if (!loggedUser && localStorage.getItem('loggedUser') === 'null') {
      return <Login />;
    }
    return <Redirect to="/" />;
  };

  renderNotFoundPage = () => <NotFound />;

  setToast = (isSuccess: boolean, message: string, isHidden: boolean) => {
    this.setState({ toast: { isSuccess, message, isHidden } });
  };

  render() {
    const {
      toast: { isSuccess, message, isHidden },
    } = this.state;
    return (
      <div className="app-container">
        <Toast
          isSuccess={isSuccess}
          message={message}
          isHidden={isHidden}
          setToast={this.setToast}
        />
        <Router>
          <Switch>
            <Route path="/" exact render={this.renderHomePage} />
            <Route path="/login" render={this.renderLoginPage} />
            <Route path="/admin" render={this.renderAdminPage} />
            <Route render={this.renderNotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
