import defaultRestaurants from '../data/defaultRestaurants.json';

const fetchRestaurantListData = () => {
  if (!window.localStorage.getItem('restaurants')) {
    const defaultRestaurantsJSON = JSON.stringify(defaultRestaurants);
    localStorage.setItem('restaurants', defaultRestaurantsJSON);
  }
  return JSON.parse(localStorage.getItem('restaurants') as string);
};

export default fetchRestaurantListData;
