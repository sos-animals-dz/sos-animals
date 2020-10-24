import React from 'react';

import AddAnimal from './AddAnimal';
import DisplayAnimal from './DisplayAnimal';
import IAnimal from '../interfaces/IAnimal';

interface IProps {
  isSideOpen: false | IAnimal | 'add-animal';
  toggleSide: (isSideOpen: false | IAnimal | 'add-animal') => void;
  saveAnimal: (type: string, description: string, picture: string) => void;
  cancelAnimal: () => void;
  reportAnimal: (id: number, report: string) => void;
}

export default function Sidebar(props: IProps) {
  const {
    isSideOpen,
    toggleSide,
    saveAnimal,
    cancelAnimal,
    reportAnimal,
  } = props;

  return (
    <div className={`sidebar-container ${isSideOpen ? 'side-open' : ''}`}>
      {isSideOpen === 'add-animal' && (
        <AddAnimal
          toggleSide={toggleSide}
          saveAnimal={saveAnimal}
          cancelAnimal={cancelAnimal}
        />
      )}
      {isSideOpen !== false && isSideOpen !== 'add-animal' && (
        <DisplayAnimal
          animal={isSideOpen}
          toggleSide={toggleSide}
          reportAnimal={reportAnimal}
        />
      )}
    </div>
  );
}
