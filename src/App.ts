import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import { mockRestaurant } from './data';
import { IRestaurant, Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { CategoryOptions, FilterOptions } from './types/type';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const getInitialRestaurantList = () => {
  const localRestaurants = getLocalStorage('restaurants') ?? [];
  return [...mockRestaurant, ...localRestaurants].map(
    (restaurant) => new Restaurant(restaurant)
  );
};

interface IAppState {
  filters: Filters;
  restaurantList: RestaurantList;
  restaurantForm: RestaurantForm;
  restaurantService: RestaurantService;
}

export default class App {
  state: IAppState;

  constructor($app: HTMLDivElement) {
    const $main = document.createElement('main');
    const $modalContainer = document.querySelector('.modal-container');
    const restaurantService = new RestaurantService(getInitialRestaurantList());

    new Header($app);

    $app.appendChild($main);
    const initialResutaurantInfos = restaurantService.getRestaurantsInfo();

    this.state = {
      restaurantService,
      filters: new Filters($main, this.filterRestaurantList.bind(this)),
      restaurantList: new RestaurantList($main, initialResutaurantInfos),
      restaurantForm: new RestaurantForm(
        $modalContainer,
        this.addRestaurantInfo.bind(this)
      ),
    };

    this.filterRestaurantList.bind(this)('전체', '이름순');
  }

  getSortedList(filter: FilterOptions, filterdList: Restaurant[]) {
    const { sortByName, sortByDistance } = this.state.restaurantService;

    switch (filter) {
      case '이름순':
        return sortByName(filterdList);
      case '거리순':
        return sortByDistance(filterdList);
      default:
        return [];
    }
  }

  filterRestaurantList(category: CategoryOptions, filter: FilterOptions): void {
    const { restaurantService, restaurantList, filters } = this.state;

    if (!filters || !restaurantList) return;

    const wholeList = restaurantService.getRestaurantsInfo();

    const filtered = restaurantService.filterByCategory(wholeList, category);

    const sortedList = this.getSortedList(filter, filtered);

    filters.setState({ filter, category });

    restaurantList.setState({
      restaurantList: sortedList,
    });
  }

  addRestaurantInfo(restaurantInfo: IRestaurant) {
    this.state.restaurantService.addRestaurant(restaurantInfo);

    const {
      filters: {
        state: { category: filterByCategory, filter },
      },
    } = this.state;

    this.filterRestaurantList(
      filterByCategory as CategoryOptions,
      filter as FilterOptions
    );

    const localRestaurants = getLocalStorage('restaurants') ?? [];
    setLocalStorage('restaurants', [...localRestaurants, restaurantInfo]);
  }
}
