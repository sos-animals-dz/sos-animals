import React, { useState, useEffect } from 'react';

import { User as IUser } from 'firebase';
import AdminFiltersBar from '../components/AdminFiltersBar';
import ListAnimals from '../components/ListAnimals';
import Navbar from '../components/Navbar';

import { filter } from '../utils';

import IAnimal from '../interfaces/IAnimal';
import AnimalCardDetails from '../components/AnimalCardDetails';

interface IProps {
  animals: IAnimal[];
  loggedUser: IUser;
  isLoadingAnimals: boolean;
  setToast: (isSuccess: boolean, message: string, isHidden: boolean) => void;
  loadAnimals: (callback?: () => void) => void;
}
export default function Admin(props: IProps) {
  const {
    animals,
    isLoadingAnimals,
    loggedUser,
    setToast,
    loadAnimals,
  } = props;
  const [animalsList, setAnimalsList] = useState(animals);
  const [animal, setAnimal] = useState<IAnimal | undefined>();
  const [showAnimal, setShowAnimal] = useState(false);

  useEffect(() => {
    if (animal) {
      setShowAnimal(true);
    }
  }, [animal]);

  const filterAnimals = (sort: { date: string; type: string }) => {
    setAnimalsList(filter(sort, animals));
  };

  const close = () => {
    setAnimal(undefined);
    setShowAnimal(false);
  };

  return (
    <div className="admin-container">
      {showAnimal && (
        <AnimalCardDetails
          animal={animal}
          close={close}
          setToast={setToast}
          loadAnimals={loadAnimals}
        />
      )}
      <Navbar
        isLoadingAnimals={isLoadingAnimals}
        loggedUser={loggedUser}
        isAdmin
      />
      <div className="dashboard">
        <AdminFiltersBar filterAnimals={filterAnimals} />
        <ListAnimals
          setToast={setToast}
          animals={animalsList}
          loadAnimals={loadAnimals}
          setAnimal={setAnimal}
        />
      </div>
    </div>
  );
}
