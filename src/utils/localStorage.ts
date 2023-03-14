import Restaurant from '../domain/Restaurant';

export const saveRestaurants = (restaurants: Restaurant[]) => {
  localStorage.setItem('restaurants', JSON.stringify(restaurants));
};

export const getRestaurants = () => {
  return JSON.parse(localStorage.getItem('restaurants') || '[]');
};
