import dom from '@/utils/dom';
import Component from './core/Component';
import type RestaurantList from '@/domain/RestaurantList';
import RestaurantItem from './RestaurantItem';

interface IRestaurantListContainer {
  $target: HTMLElement;
  props: IProps;
}

interface IProps {
  kind: 'all' | 'favorite';
  restaurantList: RestaurantList;
  createHomeDropdown: (restaurantList: RestaurantList) => void;
}
class RestaurantListContainer extends Component<IProps> {
  constructor({ $target, props }: IRestaurantListContainer) {
    super($target, props);
  }

  render() {
    if (this.props.kind === 'all') {
      const { restaurantList, createHomeDropdown } = this.props;
      this.renderAllRestaurants(restaurantList);
      createHomeDropdown(restaurantList);
    }
  }

  renderAllRestaurants(restaurantList: RestaurantList) {
    const $restaurantList = dom.getElement('.restaurant-list');
    $restaurantList.replaceChildren();
    restaurantList.restaurants.forEach(restaurant => {
      new RestaurantItem({ $target: $restaurantList, information: restaurant.information });
    });
  }
}

export default RestaurantListContainer;
