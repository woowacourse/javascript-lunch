import EventComponent from "../abstract/EventComponent";

import { $ } from "../utils/selector";
import { MODAL_EVENT, ACTION_TYPES } from "../constants/event";

export default class RestaurantHeader extends EventComponent {
  private handleAddButtonClickBind;

  constructor() {
    super();
    this.handleAddButtonClickBind = this.handleAddButtonClick.bind(this);
  }

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
    $("#add-button")?.addEventListener("click", this.handleAddButtonClickBind);
  }

  private handleAddButtonClick() {
    this.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantFormModalAction, {
        bubbles: true,
        detail: { action: ACTION_TYPES.open },
      })
    );
  }

  protected removeEvent(): void {
    $("#add-button")?.removeEventListener(
      "click",
      this.handleAddButtonClickBind
    );
  }
}
