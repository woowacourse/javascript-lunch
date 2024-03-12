function getRestaurants() {
  const restaurants = localStorage.getItem('restaurants');
  return restaurants ? JSON.parse(restaurants) : [];
}

function getFilteredByCategory(restaurants: IRestaurant[], category: TAllCategory) {
  return category === '전체' ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);
}

function getSortedByName(restaurants: IRestaurant[]) {
  return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
}

function getSortedByDistance(restaurants: IRestaurant[]) {
  return [...restaurants].sort((a, b) => a.distance - b.distance);
}

const RestaurantRepository = {
  addRestaurant(restaurant: IRestaurant) {
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    localStorage.setItem('restaurants', JSON.stringify([...restaurants, restaurant]));
  },

  removeRestaurant(key: number) {
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');

    if (restaurants.length >= key) {
      localStorage.setItem('restaurants', JSON.stringify(restaurants.slice(key, 1)));
    }
  },

  transformRestaurants(category: TAllCategory, sortingOption: TSortingOption) {
    const restaurants = getRestaurants();
    const filteredRestaurants = getFilteredByCategory(restaurants, category);

    return sortingOption === '이름순' ? getSortedByName(filteredRestaurants) : getSortedByDistance(filteredRestaurants);
  },
};

export default RestaurantRepository;
