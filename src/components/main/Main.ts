import type { Category, SortBy, Restaurant } from '../../type';
import Component from '../Component';
import RestaurantFilterContainer from './restaurant/RestaurantFilterContainer';
import RestaurantList from './restaurant/RestaurantList';
import restaurantsStorage from '../../lib/restaurantsStorage';
import makeProxyObject from '../../utils/makeProxyObject';
import { DEFAULT_CATEGORY } from '../../constants';

interface MainState {
  currentCategory: Category;
  currentSortBy: SortBy;
  restaurants: Restaurant[];
}

class Main extends Component {
  state: MainState;

  constructor($parent: HTMLElement) {
    super({ $parent, tagName: 'main', className: '' });
    this.state = makeProxyObject(
      {
        currentCategory: DEFAULT_CATEGORY,
        currentSortBy: 'name',
        restaurants: restaurantsStorage.getRestaurants(),
      },
      this.render.bind(this)
    );
  }

  appendChild() {
    const { currentCategory, currentSortBy, restaurants } = this.state;

    new RestaurantFilterContainer(this.$wrapper, {
      currentCategory,
      currentSortBy,
      onChangeSelect: this.onChangeSelect.bind(this),
    }).render();

    new RestaurantList(this.$wrapper, { currentCategory, currentSortBy, restaurants }).render();
  }

  onChangeSelect(e: Event) {
    if (e.target instanceof HTMLSelectElement) {
      if (e.target.name === 'category') this.state.currentCategory = e.target.value as Category;
      if (e.target.name === 'sorting') this.state.currentSortBy = e.target.value as SortBy;
    }
  }
}

export default Main;
