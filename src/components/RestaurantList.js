import Restaurant from './Restaurant.js';
import Component from '../core/Component.js';
import DetailModal from './DetailModal.js';

class RestaurantList extends Component {
  template() {
    return `
        <ul class="restaurant-list"></ul>
    `;
  }

  getRestaurantList() {
    return this.props.restaurantList
      .map((restaurant) => new Restaurant({ ...restaurant, deleteRestaurant: this.props.deleteRestaurant }))
      .filter((restaurant) => this.filterByCategory(restaurant))
      .filter((restaurant) => this.filterByActiveTab(restaurant))
      .sort((a, b) => this.sortRestaurant(a, b));
  }

  filterByCategory(restaurant) {
    return this.props.category === '전체' || restaurant.props.category === this.props.category;
  }

  filterByActiveTab(restaurant) {
    if (this.props.activeTab === '모든 음식점') return true;
    if (this.props.activeTab === '자주 가는 음식점') return restaurant.props.favorite;
    return true;
  }

  sortRestaurant(a, b) {
    if (this.props.sort === '이름순') return a.props.name.localeCompare(b.props.name);
    if (this.props.sort === '거리순') return a.props.distance - b.props.distance;
    return 0;
  }

  onRender() {
    const $restaurantList = this.element.querySelector('.restaurant-list');
    const restaurantList = this.getRestaurantList();

    restaurantList.forEach((restaurant) => {
      this.element.appendChild(restaurant.element);
    });

    this.element.addEventListener('click', (event) => {
      const restaurantElement = event.target.closest('.restaurant');
      if (!restaurantElement) return;

      const restaurantId = restaurantElement.dataset.id;
      const restaurantData = this.props.restaurantList.find((restaurant) => String(restaurant.id) === restaurantId);
      if (!restaurantData) return;

      const detailModal = new DetailModal({
        content: `
          <div class="restaurant-detail">
            ${new Restaurant(restaurantData).template()}
          </div>
        `,
        onDelete: () => {
          this.props.deleteRestaurant(restaurantData.id);
        },
        link: restaurantData.link,
        restaurantData: restaurantData,
        addFavorite: this.props.addFavorite,
        removeFavorite: this.props.removeFavorite,
      });

      this.element.appendChild(detailModal.element);

      const $modal = this.element.querySelector('.modal');
      if ($modal) {
        $modal.classList.remove('hidden');
      }
    });

    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.modal')) return;

      if (event.target.closest('.restaurant__favorite')) {
        const restaurantElement = event.target.closest('.restaurant');
        if (event.target.src.includes('filled')) {
          event.target.src = event.target.src.replace('filled', 'lined');
          this.props.removeFavorite(restaurantElement.dataset.id);
        } else {
          event.target.src = event.target.src.replace('lined', 'filled');
          this.props.addFavorite(restaurantElement.dataset.id);
        }
      }
      event.stopPropagation();
    });
  }
}

export default RestaurantList;
