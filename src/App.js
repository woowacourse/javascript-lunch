import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import { mockRestaurant } from './data';
import { IRestaurant, Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { closeModal, showModal } from './modal';
import { Category, DistanceTime } from './types/type';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const getInitialRestaurantList = () => {
  const localRestaurants = getLocalStorage('restaurants') ?? [];
  return [...mockRestaurant, ...localRestaurants].map(
    (restaurant) => new Restaurant(restaurant)
  );
};

export default function App($app) {
  const $main = document.createElement('main');

  this.state = {
    filters: null,
    restaurantList: null,
    restaurantService: new RestaurantService(getInitialRestaurantList()),
  };

  this.init = () => {
    new Header($app);

    $app.appendChild($main);

    const { restaurantService } = this.state;

    this.state.filters = new Filters($main, filterRestaurantList);
    this.state.restaurantList = new RestaurantList(
      $main,
      restaurantService.getRestaurantsInfo()
    );

    filterRestaurantList('전체', '이름순');
  };

  this.render = () => {};

  this.setState = (state) => {
    this.state = { ...this.state, ...state };
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { target } = event;

    if (!target) return null;

    const category = target.querySelector('#category').value;
    const name = target.querySelector('#name').value;
    const distance = target.querySelector('#distance').value;
    const description = target.querySelector('#description').value;
    const link = target.querySelector('#link').value;

    const restaurantInfo = {
      category,
      name,
      distance: Number(distance),
    };

    if (description !== '') restaurantInfo.description = description;
    if (link !== '') restaurantInfo.URLlink = link;

    this.state.restaurantService.addRestaurant(restaurantInfo);

    const { filters } = this.state;
    if (!filters) return;

    filterRestaurantList(filters.state.category, filters.state.filter);

    const localRestaurants = getLocalStorage('restaurants') ?? [];
    setLocalStorage('restaurants', [...localRestaurants, restaurantInfo]);

    closeModal();
  };

  const handleFormCancel = () => {
    closeModal();
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

  this.init();
}
