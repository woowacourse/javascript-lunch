import '../../css/restaurant-list-container.css';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { getListOnLocalStorage } from '../utils/localStorage';
import { $ } from '../utils/selector';

class RestaurantListContainer {
  private state = {
    container: '',
    id: '',
  };

  constructor(state: { container: string; id: string }) {
    this.state = state;
  }

  render() {
    const parentElement = $(this.state.container);

    if (parentElement instanceof HTMLElement) {
      parentElement.innerHTML =
        this.state.id === 'favorite-list-container' &&
        !getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST).length
          ? this.emptyFavoriteListTemplate()
          : this.template();
    }
  }

  private emptyFavoriteListTemplate() {
    return '<h2 class="empty-favorite-list">자주 가는 음식점을 등록해 주세요</h2>';
  }

  private template() {
    /* html */
    return `
			<ul class="restaurant-list" id="${this.state.id}"></ul>
		`;
  }
}

export default RestaurantListContainer;
