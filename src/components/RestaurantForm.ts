import EventComponent from "../abstract/EventComponent";
import FormItem from "./common/FormItem";

import {
  MODAL_EVENT,
  MODAL_EVENT_ACTION,
  RESTAURANT_EVENT,
} from "../constants/event";
import { $ } from "../utils/selector";
import { KOREAN_CATEGORY } from "../constants/category";
import { distanceOptions } from "../constants/selectOptions";

customElements.define("form-item", FormItem);

export default class RestaurantForm extends EventComponent {
  getTemplate(): string {
    return `
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
      <form-item title="카테고리" required="true" label-for="category">
        <select-box
          select-id="category"
          name="category"
          options=${this.generateCategoryOptions()}
          required="true"
        >
        </select-box>
      </form-item>

      <form-item title="이름" required="true" id="name">
        <input type="text" id="name" name="name" required>
      </form-item>

      <form-item title="거리(도보 이동 시간)" required="true" label-for="time-to-reach">
        <select-box
          select-id="time-to-reach"
          name="time-to-reach"
          options=${this.getDistanceOptions()}
          required="true"
        >
        </select-box>
      </form-item>

      <form-item title="설명" label-for="description" help-text="메뉴 등 추가 정보를 입력해 주세요."}>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
      </form-item>

      <form-item title="참고 링크" label-for="link" help-text="매장 정보를 확인할 수 있는 링크를 입력해 주세요.">
        <input type="text" name="link" id="link" />
      </form-item>

      <div class="button-container">
        <button id="close-button" type="button" class="button button--secondary text-caption">취소하기</button>
        <button class="button button--primary text-caption">추가하기</button>
      </div>
    </form>
`;
  }

  protected setEvent() {
    this.addEventListener("submit", this.handleSubmit);

    $("#close-button")?.addEventListener("click", this.handleCloseButtonClick);
  }

  private handleCloseButtonClick() {
    this.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantFormModalAction, {
        bubbles: true,
        detail: { action: MODAL_EVENT_ACTION.close },
      })
    );
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const category = ($("#category") as HTMLSelectElement).value;
    const timeToReach = ($("#time-to-reach") as HTMLSelectElement).value;

    const payload = {
      ...data,
      category,
      timeToReach: Number(timeToReach),
    };

    const cleanUp = () => {
      (e.target as HTMLFormElement)?.reset();

      this.dispatchEvent(
        new CustomEvent(MODAL_EVENT.restaurantFormModalAction, {
          bubbles: true,
          detail: { action: MODAL_EVENT_ACTION.close },
        })
      );
    };

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_EVENT.restaurantFormSubmit, {
        bubbles: true,
        detail: {
          payload,
          cleanUp,
        },
      })
    );
  }

  private generateCategoryOptions() {
    return JSON.stringify(KOREAN_CATEGORY);
  }

  private getDistanceOptions() {
    return JSON.stringify(distanceOptions);
  }
}
