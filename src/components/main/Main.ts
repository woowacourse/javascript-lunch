import { Category, SortBy, Restaurant } from '../../type';
import Component from '../Component';
import RestaurantFilterContainer from './restaurant/RestaurantFilterContainer';
import RestaurantList from './restaurant/RestaurantList';
import store from '../../lib/restaurantsStorage';
import makeState from '../../utils/makeProxyObject';
import { DEFAULT_CATEGORY } from '../../utils/constants';

interface MainState {
  currentCategory: Category;
  currentSortBy: SortBy;
  restaurants: Restaurant[];
}

class Main extends Component {
  state: MainState;

  constructor($parent: HTMLElement) {
    super({ $parent, tagName: 'main', className: '' });
    this.state = makeState(
      {
        currentCategory: DEFAULT_CATEGORY,
        currentSortBy: 'name',
        restaurants: store.getRestaurants(),
      },
      this.render.bind(this)
    );
  }

  appendChild() {
    const { currentCategory, currentSortBy, restaurants } = this.state;

    new RestaurantFilterContainer(this.$wrapper, {
      currentCategory,
      currentSortBy,
      onChangeCategory: this.onChangeCategory.bind(this),
      onChangeSortBy: this.onChangeSortBy.bind(this),
    }).render();

    new RestaurantList(this.$wrapper, { currentCategory, currentSortBy, restaurants }).render();
  }

  onChangeCategory(e: Event) {
    const $select = e.target as HTMLSelectElement;
    this.state.currentCategory = $select.value as Category;
  }

  onChangeSortBy(e: Event) {
    const $select = e.target as HTMLSelectElement;
    this.state.currentSortBy = $select.value as SortBy;
  }
}

export default Main;
