function getRestaurants() {
  const restaurants = localStorage.getItem('restaurants');
  return restaurants ? JSON.parse(restaurants) : [];
}

function getFilteredByCategory(restaurants: IRestaurant[], category: TAllCategory) {
  return category === '전체' ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);
}

function getSortedByName(restaurants: IRestaurant[]) {
  return [
    ...restaurants.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }),
  ];
}

function getSortedByDistance(restaurants: IRestaurant[]) {
  return [...restaurants.sort((a, b) => a.distance - b.distance)];
}

const RestaurantRepository = {
  addRestaurant(restaurant: IRestaurant) {
    const restaurants = localStorage.getItem('restaurants');

    if (restaurants) {
      localStorage.setItem('restaurants', JSON.stringify([...JSON.parse(restaurants), restaurant]));
    } else {
      localStorage.setItem('restaurants', JSON.stringify([restaurant]));
    }
  },

  transformRestaurants(category: TAllCategory, sortingOption: TSortingOption) {
    const restaurants = getRestaurants();
    const filteredRestaurants = getFilteredByCategory(restaurants, category);

    return sortingOption === '이름순' ? getSortedByName(filteredRestaurants) : getSortedByDistance(filteredRestaurants);
  },
};

export default RestaurantRepository;
