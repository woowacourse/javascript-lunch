import { Component, Restaurant } from '../type';

type RestaurantListItemState = Restaurant;

class RestaurantListItem implements Component<RestaurantListItemState> {
  $component: HTMLElement;
  state: RestaurantListItemState;

  constructor($parent: HTMLElement, state: RestaurantListItemState) {
    this.$component = document.createElement('div');
    this.state = state;
  }

  setState(newState: RestaurantListItemState) {
    this.state = newState;

    this.render();
  }

  render() {
    // TODO: 상태로 받은 li 띄우기
    this.$component.innerHTML = `
      <li class="restaurant">
        <div class="restaurant__category">${/* category img */ 1}</div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">이태리키친</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 20분 내</span>
          <p class="restaurant__description text-body">늘 변화를 추구하는 이태리키친입니다.</p>
        </div>
      </li>`;
  }
}

export default RestaurantListItem;
