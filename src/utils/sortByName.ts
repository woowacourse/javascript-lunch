import IRestaurantInput from '../interfaces/IRestaurantInput';

const sortItemsByName = (items: IRestaurantInput[]) => {
  items.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

export default sortItemsByName;
