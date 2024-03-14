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
  renderHomeDropdown: (restaurantList: RestaurantList) => void;
}
class RestaurantListContainer extends Component<IProps> {
  constructor({ $target, props }: IRestaurantListContainer) {
    super($target, props);
  }

  render() {
    if (this.props.kind === 'all') {
      const { restaurantList, renderHomeDropdown } = this.props;
      this.renderAllRestaurants(restaurantList);
      renderHomeDropdown(restaurantList);
    }
  }

  renderAllRestaurants(restaurantList: RestaurantList) {
    const $restaurantList = dom.getElement('.restaurant-list');
    $restaurantList.replaceChildren();
    restaurantList.restaurants.forEach(restaurant => {
      new RestaurantItem({
        $target: $restaurantList,
        props: {
          information: restaurant.information,
          handleClickFavorite: this.handleClickFavorite.bind(this),
        },
      });
    });
  }

  handleClickFavorite(id: string) {
    const { restaurantList } = this.props;
    restaurantList.setFavoriteRestaurantList(id);
    this.renderAllRestaurants(restaurantList);
  }
}

export default RestaurantListContainer;
