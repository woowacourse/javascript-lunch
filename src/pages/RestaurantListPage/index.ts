import type { Component } from '../../interface';
import type { Category, SortBy, Restaurant, TabBarSelect } from '../../type';
import RestaurantList from './RestaurantList';
import RestaurantFilterContainer from './RestaurantFilterContainer';
import { DEFAULT_CATEGORY, REQUEST_RASTAURANT_KEY } from '../../utils/constants';
import GNB from '../../components/GNB';
import TabBar from '../../components/TabBar';
import RestaurantInfoDrawer from '../../components/RestaurantInfoDrawer';

type RestaurantListPageState = {
  category: Category;
  sortBy: SortBy;
  tabBarSelect: TabBarSelect;
  restaurants: Restaurant[];
  toggleAddRestaurantDrawer: () => void;
  isOpenDrawer: boolean;
  selectId: number;
};

type RestaurantListPageProps = {
  $parent: HTMLElement;
  toggleAddRestaurantDrawer: () => void;
};

class RestaurantListPage implements Component<RestaurantListPageState> {
  $target: HTMLElement;
  state: RestaurantListPageState;

  constructor({ $parent, toggleAddRestaurantDrawer }: RestaurantListPageProps) {
    this.$target = document.createElement('div');

    this.state = {
      isOpenDrawer: false,
      category: DEFAULT_CATEGORY,
      sortBy: 'name',
      tabBarSelect: 'all',
      restaurants: this.getRestaurants(),
      toggleAddRestaurantDrawer,
      selectId: 0,
    };

    $parent.append(this.$target);
  }

  setState(newState: RestaurantListPageState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$target.innerHTML = '';

    new GNB({
      $parent: this.$target,
      toggleAddRestaurantDrawer: this.state.toggleAddRestaurantDrawer,
    }).render();
    new TabBar({
      $parent: this.$target,
      tabBarSelect: this.state.tabBarSelect,
      onClickTabBar: this.onClickTabBar.bind(this),
    }).render();
    new RestaurantFilterContainer({
      $parent: this.$target,
      category: this.state.category,
      sortBy: this.state.sortBy,
      onChangeCategory: this.onChangeCategory.bind(this),
      onChangeSortBy: this.onChangeSortBy.bind(this),
    }).render();

    new RestaurantList({
      $parent: this.$target,
      category: this.state.category,
      sortBy: this.state.sortBy,
      tabBarSelect: this.state.tabBarSelect,
      restaurants: this.state.restaurants,
      handleByClickFavorite: this.handleByClickFavorite.bind(this),
      onOpenInfoDrawer: this.onOpenInfoDrawer.bind(this),
    }).render();

    if (this.state.isOpenDrawer) {
      new RestaurantInfoDrawer({
        $parent: this.$target,
        selectId: this.state.selectId,
        toggleOpenDrawer: this.toggleOpenDrawer.bind(this),
        handleByClickFavorite: this.handleByClickFavorite.bind(this),
      }).render();
    }
  }

  getRestaurants() {
    return JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');
  }

  onChangeCategory(e: Event) {
    const $select = e.target as HTMLSelectElement;
    const category = $select.value as Category;

    this.setState({
      ...this.state,
      category,
    });
  }

  onChangeSortBy(e: Event) {
    const $select = e.target as HTMLSelectElement;
    const sortBy = $select.value as SortBy;

    this.setState({
      ...this.state,
      sortBy,
    });
  }

  onClickTabBar(e: Event) {
    const target = e.target as HTMLButtonElement;
    const tabBarSelect = target.dataset.type as TabBarSelect;
    this.setState({
      ...this.state,
      tabBarSelect,
    });
  }

  handleByClickFavorite() {
    const restaurants = this.getRestaurants();
    this.setState({ ...this.state, restaurants });
  }

  onOpenInfoDrawer(e: Event) {
    const currentTarget = e.currentTarget as HTMLElement;

    const rid = currentTarget.dataset.restaurantId ?? '0';
    const ridIndex = Number(rid);

    this.setState({
      ...this.state,
      isOpenDrawer: true,
      selectId: ridIndex,
    });
  }

  toggleOpenDrawer() {
    this.setState({
      ...this.state,
      isOpenDrawer: !this.state.isOpenDrawer,
    });
  }
}

export default RestaurantListPage;
