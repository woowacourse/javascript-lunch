import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import Tabs from './components/Tabs';
import { IRestaurant, Restaurant } from './domain/Restaurant';
import RestaurantService from './domain/RestaurantService';
import { store } from './store';
import { TabType } from './types/type';
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

export interface IMethods {
  renderListArticle: ($currentTarget: TabType) => void;
  deleteHandler: (id: number) => void;
  updateLocalStorage: () => void;
}

export default class App {
  $listArticle = document.createElement('article');
  state: IAppState;

  constructor($app: HTMLDivElement) {
    const $main = document.createElement('main');
    const restaurantService = new RestaurantService(getInitialRestaurantList());

    $app.appendChild(Header(this.addRestaurantInfo.bind(this)));
    $app.appendChild($main);
    $main.appendChild(this.$listArticle);

    const initialResutaurantInfos = restaurantService.getRestaurantsInfo();

    const tabs = new Tabs($main, this.renderListArticle.bind(this));
    const filters = new Filters(
      this.$listArticle,
      this.renderAllList.bind(this)
    );
    const restaurantList = new RestaurantList(
      this.$listArticle,
      initialResutaurantInfos,
      {
        renderListArticle: this.renderListArticle.bind(this),
        deleteHandler: this.deleteRestaurantInfo.bind(this),
        updateLocalStorage: () => this.updateLocalStorage(),
      }
    );

    this.state = {
      restaurantService,
      tabs,
      filters,
      restaurantList,
    };

    this.renderListArticle(store.currentTab);
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
      ...restaurantList.state,
      restaurantList: filteredAndSortedList,
    });

    filters.render($targetElement);
    restaurantList.render($targetElement);
  }

  renderFavoriteList($targetElement: HTMLElement) {
    const favorites = this.state.restaurantService.getFilterdFavoriteList();
    const favoriteNameSorted =
      this.state.restaurantService.sortByName(favorites);

    this.state.restaurantList.setState({
      ...this.state.restaurantList.state,
      restaurantList: favoriteNameSorted,
    });
    this.state.restaurantList.render($targetElement);
  }

  addRestaurantInfo(restaurantInfo: IRestaurant) {
    this.state.restaurantService.addRestaurant(restaurantInfo);

    this.renderListArticle(store.currentTab);

    this.updateLocalStorage();
  }

  deleteRestaurantInfo(id: number) {
    this.state.restaurantService.deleteRerstaurant(id);

    this.renderListArticle(store.currentTab);

    this.updateLocalStorage();
  }

  updateLocalStorage() {
    const currentList = this.state.restaurantService.getWholeRestaurantList();

    setLocalStorage('restaurants', JSON.stringify(currentList));
  }
}
