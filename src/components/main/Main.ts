import { Category, SortBy, Restaurant } from '../../type';
import Component from '../Component';
import RestaurantFilterContainer from './restaurant/RestaurantFilterContainer';
import RestaurantList from './restaurant/RestaurantList';
import store from '../../lib/restaurantsStorage';
import { DEFAULT_CATEGORY } from '../../utils/constants';

interface MainProps {}

interface MainState {
  currentCategory: Category;
  currentSortBy: SortBy;
  restaurants: Restaurant[];
}

class Main extends Component<MainProps, MainState> {
  constructor($parent: HTMLElement, props: MainProps) {
    const restaurants = store.getRestaurants();
    super({
      $parent,
      props,
      tagName: 'main',
      initialState: {
        currentCategory: DEFAULT_CATEGORY,
        currentSortBy: 'name',
        restaurants,
      },
    });
  }

  appendChild() {
    const { currentCategory, currentSortBy, restaurants } = this.state;

    new RestaurantFilterContainer(this.$wrapper, {
      currentCategory,
      currentSortBy,
      onChangeCategory: this.onChangeCategory.bind(this),
      onChangeSortBy: this.onChangeSortBy.bind(this),
    });

    new RestaurantList(this.$wrapper, { currentCategory, currentSortBy, restaurants });
  }

  onChangeCategory(e: Event) {
    const $select = e.target as HTMLSelectElement;
    const category = $select.value as Category;
    this.setState({
      ...this.state,
      currentCategory: category,
    });
  }

  onChangeSortBy(e: Event) {
    const $select = e.target as HTMLSelectElement;
    const sortBy = $select.value as SortBy;
    this.setState({
      ...this.state,
      currentSortBy: sortBy,
    });
  }
}

export default Main;
