import React from 'react';
import AnimalCard from './AnimalCard';
import IAnimal from '../interfaces/IAnimal';

interface IProps {
  animals: IAnimal[];
  setAnimal: (animal: IAnimal) => void;
  setToast: (isSuccess: boolean, message: string, isHidden: boolean) => void;
  loadAnimals: (callback?: () => void) => void;
}

export default function ListAnimals(props: IProps) {
  const { animals, setToast, loadAnimals, setAnimal } = props;
  return (
    <div className="animals-list">
      <div className="header-card">
        <div className="animal-type">
          <span>type</span>
        </div>
        <div className="animal-picture">
          <span>picture</span>
        </div>
        <div className="animal-description">
          <span>description</span>
        </div>
        <div className="animal-reports">
          <span>reports</span>
        </div>
        <div className="animal-created-at">
          <span>created</span>
        </div>
        <div className="animal-buttons">
          <span>delete</span>
        </div>
      </div>
      {animals.length ? (
        animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            setToast={setToast}
            loadAnimals={loadAnimals}
            setAnimal={setAnimal}
          />
        ))
      ) : (
        <p className="no-data">no animal is available</p>
      )}
    </div>
  );
}
