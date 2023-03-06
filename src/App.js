import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import { mockRestaurant } from './data';
import { Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const getInitialRestaurantList = () => {
  const localRestaurants = getLocalStorage('restaurants') ?? [];
  return [...mockRestaurant, ...localRestaurants].map(
    (restaurant) => new Restaurant(restaurant)
  );
};

export default function App($app) {
  const $main = document.createElement('main');
  const $modalContainer = document.querySelector('.modal-container');

  this.state = {
    filters: null,
    restaurantList: null,
    restaurantForm: null,
    restaurantService: new RestaurantService(getInitialRestaurantList()),
  };

  this.init = () => {
    new Header($app, addRestaurantInfo);

    $app.appendChild($main);

    const { restaurantService } = this.state;
    const initialResutaurantInfos = restaurantService.getRestaurantsInfo();

    this.state.filters = new Filters($main, filterRestaurantList);
    this.state.restaurantList = new RestaurantList(
      $main,
      initialResutaurantInfos
    );
    this.state.restaurantForm = new RestaurantForm(
      $modalContainer,
      addRestaurantInfo
    );

    filterRestaurantList('전체', '이름순');
  };

  const filterRestaurantList = (category, filter) => {
    const { restaurantService, restaurantList, filters } = this.state;
    const { sortByName, sortByDistance } = restaurantService;

    if (!filters || !restaurantList) return;

    const filtered = restaurantService.filterByCategory(
      restaurantService.getRestaurantsInfo(),
      category
    );

    let sorted = null;
    if (filter === '이름순') sorted = sortByName(filtered);
    if (filter === '거리순') sorted = sortByDistance(filtered);

    filters.setState({ filter, category });

    restaurantList.setState({
      restaurantList: sorted,
    });
  };

  const addRestaurantInfo = (restaurantInfo) => {
    this.state.restaurantService.addRestaurant(restaurantInfo);

    const {
      filters: {
        state: { category: filterByCategory, filter },
      },
    } = this.state;

    filterRestaurantList(filterByCategory, filter);

    const localRestaurants = getLocalStorage('restaurants') ?? [];
    setLocalStorage('restaurants', [...localRestaurants, restaurantInfo]);
  };

  this.init();
}
