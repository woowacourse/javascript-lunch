import EventComponent from "../abstract/EventComponent";

import { $ } from "../utils/selector";
import { MODAL_EVENT, MODAL_EVENT_ACTION } from "../constants/event";

export default class RestaurantHeader extends EventComponent {
  protected getTemplate() {
    return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button id="add-button" type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가">
      </button>
    </header>
    `;
  }

  setEvent() {
    $("#add-button")?.addEventListener("click", this.handleAddButtonClick);
  }

  private handleAddButtonClick() {
    this.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantFormModalAction, {
        bubbles: true,
        detail: { action: MODAL_EVENT_ACTION.open },
      })
    );
  }
}
