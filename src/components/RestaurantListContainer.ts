import type RestaurantDetailModal from './modal/restaurantDetailModal/RestaurantDetailModal';
import type RestaurantList from '@/domain/RestaurantList';
import type { IRestaurantList } from '@/types/restaurant';

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
  restaurantDetailModal: RestaurantDetailModal;
}

class RestaurantListContainer extends Component<IProps> {
  constructor({ $target, props }: IRestaurantListContainer) {
    super($target, props);
  }

  render() {
    const { restaurantList, kind } = this.props;
    const restaurants = kind === 'all' ? restaurantList.getAllList() : restaurantList.getFavoriteList();
    this.renderRestaurantList(restaurants);
  }

  renderRestaurantList(restaurants: IRestaurantList) {
    const $restaurantList = dom.getElement('.restaurant-list');
    $restaurantList.replaceChildren();
    restaurants.forEach(({ information }) => {
      new RestaurantItem({
        $target: $restaurantList,
        props: {
          information,
          handleClickFavorite: () => {
            this.handleClickFavorite(information.id);
          },
          handleClickDetail: () => {
            this.props.restaurantDetailModal.setRestaurant(information, this.handleClickFavorite.bind(this));
            this.props.restaurantDetailModal.toggle();
          },
        },
      });
    });
  }

  handleClickFavorite(id: string) {
    const { restaurantList } = this.props;
    restaurantList.setFavoriteRestaurantList(id);
    const restaurants = this.props.kind === 'all' ? restaurantList.getAllList() : restaurantList.getFavoriteList();
    this.renderRestaurantList(restaurants);
  }
}

export default RestaurantListContainer;
