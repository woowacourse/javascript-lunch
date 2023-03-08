import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import Tabs from './components/Tabs';
import { mockRestaurant } from './data';
import { IRestaurant, Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { CategoryOptions, FilterOptions } from './types/type';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const getInitialRestaurantList = () => {
  const localRestaurants =
    JSON.parse(getLocalStorage('restaurants') as string) || [];

  return [...mockRestaurant, ...localRestaurants].map(
    (restaurant) => new Restaurant(restaurant)
  );
};

interface IAppState {
  tabs: Tabs;
  filters: Filters;
  restaurantList: RestaurantList;
  restaurantForm: RestaurantForm;
  restaurantService: RestaurantService;
}

export default class App {
  $listArticle = document.createElement('article');
  state: IAppState;

  constructor($app: HTMLDivElement) {
    const $main = document.createElement('main');
    const $modalContainer = document.querySelector('.modal-container');
    const restaurantService = new RestaurantService(getInitialRestaurantList());

    new Header($app);

    $app.appendChild($main);
    $main.appendChild(this.$listArticle);
    const initialResutaurantInfos = restaurantService.getRestaurantsInfo();

    this.state = {
      restaurantService,
      tabs: new Tabs($main),
      filters: new Filters(
        this.$listArticle,
        this.updateRestaurantList.bind(this)
      ),
      restaurantList: new RestaurantList(
        this.$listArticle,
        initialResutaurantInfos
      ),
      restaurantForm: new RestaurantForm(
        $modalContainer as HTMLDivElement,
        this.addRestaurantInfo.bind(this)
      ),
    };

    this.updateRestaurantList.bind(this)('전체', '이름순');
  }

  updateRestaurantList(category: CategoryOptions, filter: FilterOptions) {
    const { restaurantService, restaurantList, filters } = this.state;

    if (!filters || !restaurantList) return;

    const filteredAndSortedList = restaurantService.getFilteredAndSortedList(
      category,
      filter
    );

    filters.setState({ filter, category });

    restaurantList.setState({
      restaurantList: filteredAndSortedList,
    });
  }

  addRestaurantInfo(restaurantInfo: IRestaurant) {
    this.state.restaurantService.addRestaurant(restaurantInfo);

    const {
      state: { category, filter },
    } = this.state.filters;

    this.updateRestaurantList(category, filter);

    const localRestaurants =
      JSON.parse(getLocalStorage('restaurants') as string) || [];

    setLocalStorage(
      'restaurants',
      JSON.stringify([...localRestaurants, restaurantInfo])
    );
  }
}
