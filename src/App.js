import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import { mockRestaurant } from './data';
import { Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { closeModal, showModal } from './modal';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const getInitialRestaurantList = () => {
  const localRestaurants = getLocalStorage('restaurants') ?? [];
  return [...mockRestaurant, ...localRestaurants].map(
    (restaurant) => new Restaurant(restaurant)
  );
};

export default function App($app) {
  this.state = {
    main: null,
    header: null,
    filters: null,
    restaurantList: null,
    restaurantService: new RestaurantService(getInitialRestaurantList()),
  };

  this.init = () => {
    this.state.header = new Header($app, showRestaurantAddUI);

    appendMain();

    const { main, restaurantService } = this.state;

    this.state.filters = new Filters(main, handleFiltersChange);
    this.state.restaurantList = new RestaurantList(
      main,
      restaurantService.getRestaurantsInfo()
    );

    filterRestaurantList('전체', '이름순');
  };

  this.render = () => {};

  this.setState = (state) => {
    this.state = { ...this.state, ...state };
  };

  const showRestaurantAddUI = () => {
    showModal();
    const $modalContainer = document.querySelector('.modal-container');
    new RestaurantForm($modalContainer, handleFormSubmit, handleFormCancel);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const category = event.target.querySelector('#category').value;
    const name = event.target.querySelector('#name').value;
    const distance = event.target.querySelector('#distance').value;
    const description = event.target.querySelector('#description').value;
    const link = event.target.querySelector('#link').value;

    const restaurantInfo = {
      category,
      name,
      distance: Number(distance),
    };

    if (description !== '') restaurantInfo.description = description;
    if (link !== '') restaurantInfo.URLlink = link;

    this.state.restaurantService.addRestaurant(restaurantInfo);

    filterRestaurantList(
      this.state.filters.state.category,
      this.state.filters.state.filter
    );

    const localRestaurants = getLocalStorage('restaurants') ?? [];
    setLocalStorage('restaurants', [...localRestaurants, restaurantInfo]);

    closeModal();
  };

  const handleFormCancel = () => {
    closeModal();
  };

  const appendMain = () => {
    const $main = document.createElement('main');
    $app.appendChild($main);
    this.state.main = $main;
  };

  const handleFiltersChange = (event) => {
    const { restaurantService, restaurantList, filters } = this.state;
    const { id, value } = event.target;

    switch (id) {
      case 'category-filter':
        filterRestaurantList(value, filters.state.filter);
        break;
      case 'sorting-filter':
        filterRestaurantList(filters.state.category, value);

        break;

      default:
        return;
    }
  };

  const filterRestaurantList = (category, filter) => {
    const { restaurantService, restaurantList, filters } = this.state;

    const filtered = restaurantService.filterByCategory(
      restaurantService.getRestaurantsInfo(),
      category
    );

    let sorted = null;
    if (filter === '이름순') {
      sorted = restaurantService.sortByName(filtered);
    }
    if (filter === '거리순') {
      sorted = restaurantService.sortByDistance(filtered);
    }

    filters.setState({ filter, category });

    restaurantList.setState({
      restaurantList: sorted,
    });
  };

  this.init();
}
