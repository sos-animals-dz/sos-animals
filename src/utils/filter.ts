import reverse from './reverse';
import IAnimal from '../interfaces/IAnimal';

const filter = (sort: { date: string; type: string }, animals: IAnimal[]) => {
  const { date, type } = sort;
  let sorted: IAnimal[] = [];

  if (date === 'asc') {
    sorted = reverse(animals);
  } else if (date === 'desc') {
    sorted = animals;
  }

  if (type === 'dog' || type === 'cat' || type === 'bird' || type === 'other') {
    sorted = sorted.filter(
      (animal) => animal.type.toLowerCase() === type.toLowerCase()
    );
  }

  return sorted;
};

export default filter;
