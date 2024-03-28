import Sorting from '../enums/Sorting';
import Restaurant from '../interfaces/Restaurant';
import RestaurantList from '../components/RestaurantList/RestaurantList';

const addRestaurant = (restaurantData?: object) => {
  const existingData = JSON.parse(localStorage.getItem('restaurants')!) || [];
  existingData.push(restaurantData as Restaurant);
  localStorage.setItem('restaurants', JSON.stringify(existingData));
  const oldRestaurantList = document.querySelector('.restaurant-list-container');
  oldRestaurantList?.replaceChildren();

  new RestaurantList('전체', Sorting.이름순);
};

export default addRestaurant;
