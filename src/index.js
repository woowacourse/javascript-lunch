import Restaurants from './domain/Restaurants';

if (localStorage.getItem('restaurants') === null) {
  localStorage.setItem('restaurants', JSON.stringify([]));
}

const restaurants = new Restaurants(JSON.parse(localStorage.getItem('restaurants')));
