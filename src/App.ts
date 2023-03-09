import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import Tabs from './components/Tabs';
import { mockRestaurant } from './data';
import { IRestaurant, Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { CategoryOptions, FilterOptions, TabType } from './types/type';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

const getInitialRestaurantList = () => {
  const localRestaurants =
    JSON.parse(getLocalStorage('restaurants') as string) || [];

  return [...localRestaurants].map((restaurant) => new Restaurant(restaurant));
};

interface IAppState {
  tabs: Tabs;
  filters: Filters;
  restaurantList: RestaurantList;
  restaurantService: RestaurantService;
}

export default class App {
  $listArticle = document.createElement('article');
  state: IAppState;

  constructor($app: HTMLDivElement) {
    const $main = document.createElement('main');
    const restaurantService = new RestaurantService(getInitialRestaurantList());

    new Header($app, this.addRestaurantInfo.bind(this));

    $app.appendChild($main);
    $main.appendChild(this.$listArticle);

    const initialResutaurantInfos = restaurantService.getRestaurantsInfo();

    this.state = {
      restaurantService,
      tabs: new Tabs($main, this.renderListArticle.bind(this)),
      filters: new Filters(this.$listArticle, this.renderAllList.bind(this)),
      restaurantList: new RestaurantList(
        this.$listArticle,
        initialResutaurantInfos,
        this.deleteRestaurantInfo.bind(this)
      ),
    };

    this.renderListArticle(this.state.tabs.currentTab);
  }

  renderListArticle(currentTab?: TabType) {
    this.$listArticle.innerHTML = '';
    if (!currentTab) currentTab = 'all';

    switch (currentTab) {
      case 'all':
        this.renderAllList(this.$listArticle);
        break;
      case 'favorite':
        this.renderFavoriteList(this.$listArticle);
        break;
      default:
        return;
    }
  }

  renderAllList($targetElement: HTMLElement) {
    const { filters, restaurantList, restaurantService } = this.state;
    const { category, filter } = filters.state;

    const filteredAndSortedList = restaurantService.getFilteredAndSortedList(
      category,
      filter
    );

    restaurantList.setState({
      restaurantList: filteredAndSortedList,
    });

    filters.render($targetElement);
    restaurantList.render($targetElement);
  }

  renderFavoriteList($targetElement: HTMLElement) {
    const favorites = this.state.restaurantService.getFilterdFavoriteList();
    this.state.restaurantList.setState({ restaurantList: favorites });
    this.state.restaurantList.render($targetElement);
  }

  addRestaurantInfo(restaurantInfo: IRestaurant) {
    this.state.restaurantService.addRestaurant(restaurantInfo);

    this.renderListArticle(this.state.tabs.currentTab);

    const localRestaurants =
      JSON.parse(getLocalStorage('restaurants') as string) || [];

    setLocalStorage(
      'restaurants',
      JSON.stringify([...localRestaurants, restaurantInfo])
    );
  }

  deleteRestaurantInfo(id: number) {
    this.state.restaurantService.deleteRerstaurant(id);

    this.renderListArticle(this.state.tabs.currentTab);

    const currentList = [
      ...this.state.restaurantService.getRestaurantsInfo(),
    ].map((restaurant) => restaurant.getRestaurantInfo());

    setLocalStorage('restaurants', JSON.stringify(currentList));
  }
}
