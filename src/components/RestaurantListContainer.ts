import type RestaurantList from '@/domain/RestaurantList';
import type { TTabMenu } from '@/types/restaurant';

import Component from './core/Component';
import RestaurantItem from './RestaurantItem';

import dom from '@/utils/dom';

interface IRestaurantListContainer {
  $target: HTMLElement;
  props: IProps;
}

interface IProps {
  kind: 'all' | 'favorite';
  restaurantList: RestaurantList;
}

class RestaurantListContainer extends Component<IProps> {
  constructor({ $target, props }: IRestaurantListContainer) {
    super($target, props);
  }

  render() {
    const { restaurantList } = this.props;
    this.renderRestaurantList(restaurantList, this.props.kind);
  }

  renderRestaurantList(restaurantList: RestaurantList, kind: TTabMenu) {
    if (kind === 'all') this.renderAllRestaurants(restaurantList);
    else if (kind === 'favorite') this.renderFavoriteRestaurants(restaurantList);
  }

  renderAllRestaurants(restaurantList: RestaurantList) {
    const $restaurantList = dom.getElement('.restaurant-list');
    $restaurantList.replaceChildren();
    restaurantList.getAllList().forEach(restaurant => {
      new RestaurantItem({
        $target: $restaurantList,
        props: {
          information: restaurant.information,
          handleClickFavorite: this.handleClickFavorite.bind(this),
        },
      });
    });
  }

  renderFavoriteRestaurants(restaurantList: RestaurantList) {
    const $restaurantList = dom.getElement('.restaurant-list');
    $restaurantList.replaceChildren();
    const favoriteRestaurants = restaurantList.getFavoriteList();
    favoriteRestaurants.forEach(restaurant => {
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
