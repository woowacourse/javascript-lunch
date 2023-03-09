import type { Component } from '../../interface';
import type { Category, SortBy, Restaurant, TabBarSelect } from '../../type';
import RestaurantList from './RestaurantList';
import RestaurantFilterContainer from './RestaurantFilterContainer';
import { DEFAULT_CATEGORY, REQUEST_RASTAURANT_KEY } from '../../utils/constants';
import GNB from '../../components/GNB';
import TabBar from '../../components/TabBar';
import RestaurantInfoDrawer from '../RestaurantInfoDrawer';
import { getRestaurants } from '../../utils/api';

type RestaurantListPageState = {
  category: Category;
  sortBy: SortBy;
  tabBarSelect: TabBarSelect;
  restaurants: Restaurant[];
  isOpenDrawer: boolean;
  selectId: number;
  onToggleAddRestaurantDrawer: () => void;
};

type RestaurantListPageProps = {
  $parent: HTMLElement;
  onToggleAddRestaurantDrawer: () => void;
};

export default class RestaurantListPage implements Component<RestaurantListPageState> {
  $target: HTMLElement;
  state: RestaurantListPageState;

  constructor({ $parent, onToggleAddRestaurantDrawer }: RestaurantListPageProps) {
    this.$target = document.createElement('div');

    this.state = {
      isOpenDrawer: false,
      category: DEFAULT_CATEGORY,
      sortBy: 'name',
      tabBarSelect: 'all',
      restaurants: getRestaurants(),
      onToggleAddRestaurantDrawer,
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
      onToggleAddRestaurantDrawer: this.state.onToggleAddRestaurantDrawer,
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
      fetchNewRestaurants: this.fetchNewRestaurants.bind(this),
      onOpenInfoDrawer: this.onOpenInfoDrawer.bind(this),
    }).render();

    if (this.state.isOpenDrawer) {
      new RestaurantInfoDrawer({
        $parent: this.$target,
        selectId: this.state.selectId,
        onToggleOpenDrawer: this.onToggleOpenDrawer.bind(this),
        fetchNewRestaurants: this.fetchNewRestaurants.bind(this),
        onDeleteRestaurant: this.onDeleteRestaurant.bind(this),
      }).render();
    }
  }

  fetchNewRestaurants() {
    const restaurants = getRestaurants();
    this.setState({ ...this.state, restaurants });
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

  onOpenInfoDrawer(e: Event) {
    const currentTarget = e.currentTarget as HTMLElement;
    const rid = Number(currentTarget.dataset.restaurantId ?? '0');

    this.setState({
      ...this.state,
      isOpenDrawer: true,
      selectId: rid,
    });
  }

  onToggleOpenDrawer() {
    this.setState({
      ...this.state,
      isOpenDrawer: !this.state.isOpenDrawer,
    });
  }

  onDeleteRestaurant() {
    const restaurants = getRestaurants();

    this.setState({
      ...this.state,
      isOpenDrawer: !this.state.isOpenDrawer,
      restaurants,
    });
  }
}
