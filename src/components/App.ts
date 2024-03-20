import type RestaurantList from '@/domain/RestaurantList';
import type { TTabMenu } from '@/types/restaurant';

import Component from './core/Component';
import Header from './header/Header';
import RestaurantAddModal from './modal/restaurantAddModal/RestaurantAddModal';
import RestaurantDetailModal from './modal/restaurantDetailModal/RestaurantDetailModal';
import renderTabMenu from './renderTabMenu';
import RestaurantListContainer from './restaurantList/RestaurantListContainer';

import dom from '@/utils/dom';

interface Props {
  restaurantList: RestaurantList;
}

class App extends Component<Props> {
  render() {
    const restaurantDetailModal = this.createRestaurantDetailModal();
    const restaurantAddModal = this.createRestaurantAddModal();
    const restaurantListContainer = this.createRestaurantList('all', restaurantDetailModal);

    this.renderHeader(restaurantAddModal);
    renderTabMenu({ restaurantListContainer, restaurantList: this.props.restaurantList });
  }

  createRestaurantDetailModal() {
    const $detailModalContainer = dom.getElement('#detail-modal');
    return new RestaurantDetailModal($detailModalContainer, {
      restaurantList: this.props.restaurantList,
    });
  }

  createRestaurantAddModal() {
    const $addModalContainer = dom.getElement('#add-modal');
    return new RestaurantAddModal($addModalContainer, {
      restaurantList: this.props.restaurantList,
    });
  }

  renderHeader(restaurantAddModal: RestaurantAddModal) {
    new Header(document.body, {
      title: '점심 뭐먹지?',
      imageSrc: './images/add-button.png',
      onClick: () => {
        restaurantAddModal.toggle();
      },
    });
  }

  createRestaurantList(kind: TTabMenu, restaurantDetailModal: RestaurantDetailModal) {
    const $restaurantContainer = dom.getElement('.restaurant-list-container');
    return new RestaurantListContainer({
      $target: $restaurantContainer,
      props: { restaurantList: this.props.restaurantList, kind, restaurantDetailModal },
    });
  }
}

export default App;
