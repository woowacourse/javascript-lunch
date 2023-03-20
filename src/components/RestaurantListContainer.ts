import '../../css/restaurant-list-container.css';
import { $ } from '../utils/selector';

class RestaurantListContainer {
  private state = {
    container: '',
  };

  constructor(state: { container: string }) {
    this.state = state;
  }

  render() {
    const parentElement = $(this.state.container);

    if (parentElement instanceof HTMLElement) {
      parentElement.innerHTML = this.template();
    }
  }

  renderEmptyTemplate() {
    const parentElement = $(this.state.container);

    if (parentElement instanceof HTMLElement) {
      parentElement.innerHTML =
        '<h2 class="empty-favorite-list">자주 가는 음식점을 등록해 주세요</h2>';
    }
  }

  private template() {
    /* html */
    return `
			<ul class="restaurant-list">
			</ul>
		`;
  }
}

export default RestaurantListContainer;
