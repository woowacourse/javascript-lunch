import EventComponent from "../abstract/EventComponent";
import FormItem from "./common/FormItem";

import {
  MODAL_EVENT,
  MODAL_EVENT_ACTION,
  RESTAURANT_EVENT,
} from "../constants/event";
import convertObjectToOptions from "../utils/convertObjectToOptions";
import { $ } from "../utils/selector";
import { KOREAN_CATEGORY } from "../constants/category";
import Restaurant, { RestaurantInfo } from "../domain/Restaurant";

customElements.define("form-item", FormItem);

const distanceOptions = [
  { value: null, label: "선택해 주세요" },
  { value: 5, label: "5분 내" },
  { value: 10, label: "10분 내" },
  { value: 15, label: "15분 내" },
  { value: 20, label: "20분 내" },
  { value: 30, label: "30분 내" },
];

export default class RestaurantForm extends EventComponent {
  getTemplate(): string {
    return `
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
      <form-item title="카테고리" required="true" label-for="category">
        <select-box
          select-id="category"
          class-name="category-select"
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
          class-name="time-to-reach-select"
          name="timeToReach"
          options=${this.generateDistanceOptions()}
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

    try {
      const restaurantInfo = this.extractRestaurantFormData(form);
      const newRestaurant = new Restaurant(restaurantInfo as RestaurantInfo);

      this.dispatchEvent(
        new CustomEvent(RESTAURANT_EVENT.restaurantFormSubmit, {
          bubbles: true,
          detail: { newRestaurant },
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }

    this.cleanUpSubmit(form);
  }

  private generateCategoryOptions() {
    return this.generateOptions(KOREAN_CATEGORY);
  }

  private generateDistanceOptions() {
    const optionsWithoutBlank = distanceOptions.map((option) => ({
      ...option,
      label: option.label.replace(" ", "&nbsp;"),
    }));

    return JSON.stringify(optionsWithoutBlank);
  }

  private generateOptions(filterLiteralObject: Record<string, string>) {
    const filteredOptions = convertObjectToOptions(filterLiteralObject);

    return JSON.stringify(filteredOptions);
  }

  private extractRestaurantFormData(form: HTMLFormElement) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    return {
      ...data,
      timeToReach: Number(data.timeToReach),
    };
  }

  private cleanUpSubmit(form: HTMLFormElement) {
    form.reset();

    this.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantFormModalAction, {
        bubbles: true,
        detail: { action: MODAL_EVENT_ACTION.close },
      })
    );
  }
}
