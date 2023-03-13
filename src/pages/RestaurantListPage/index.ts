import type { Component } from '../../interface';
import type { Category, SortBy, Restaurant, TabBarSelect } from '../../type';
import RestaurantList from './RestaurantList';
import RestaurantFilterContainer from './RestaurantFilterContainer';
import { DEFAULT_CATEGORY } from '../../utils/constants';
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
};

type RestaurantListPageProps = {
  $parent: HTMLElement;
};

export default class RestaurantListPage implements Component<RestaurantListPageState> {
  $target: HTMLElement;
  state: RestaurantListPageState;

  constructor({ $parent }: RestaurantListPageProps) {
    this.$target = document.createElement('div');

    this.state = {
      isOpenDrawer: false,
      category: DEFAULT_CATEGORY,
      sortBy: 'name',
      tabBarSelect: 'all',
      restaurants: getRestaurants(),
      selectId: 0,
    };

    $parent.append(this.$target);
  }

  public setState(newState: RestaurantListPageState) {
    this.state = newState;
    this.render();
  }

  public render() {
    this.$target.innerHTML = '';

    new TabBar({
      $parent: this.$target,
      tabBarSelect: this.state.tabBarSelect,
      onClickTabBar: this.onClickTabBar.bind(this),
    }).render();
    new RestaurantFilterContainer({
      $parent: this.$target,
      category: this.state.category,
      sortBy: this.state.sortBy,
      onChangeDropDown: this.onChangeDropDown.bind(this),
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

  public fetchNewRestaurants() {
    const restaurants = getRestaurants();
    this.setState({ ...this.state, restaurants });
  }

  public onChangeDropDown(e: Event) {
    const $select = e.target as HTMLSelectElement;
    const key = $select.dataset.key as 'category' | 'sortBy';
    this.setState({
      ...this.state,
      [key]: $select.value,
    });
  }

  public onClickTabBar(e: Event) {
    const target = e.target as HTMLButtonElement;
    const tabBarSelect = target.dataset.type as TabBarSelect;

    this.setState({
      ...this.state,
      tabBarSelect,
    });
  }

  public onOpenInfoDrawer(e: Event) {
    const currentTarget = e.currentTarget as HTMLElement;
    const restaurantId = Number(currentTarget.dataset.restaurantId ?? '0');

    this.setState({
      ...this.state,
      isOpenDrawer: true,
      selectId: restaurantId,
    });
  }

  public onToggleOpenDrawer() {
    this.setState({
      ...this.state,
      isOpenDrawer: !this.state.isOpenDrawer,
    });
  }

  public onDeleteRestaurant() {
    const restaurants = getRestaurants();

    this.setState({
      ...this.state,
      isOpenDrawer: !this.state.isOpenDrawer,
      restaurants,
    });
  }
}
