import type { Category, Distance, Restaurant } from "../../../types/restaurant";

import { Modal } from "..";
import { InputBox } from "./InputBox";
import Random from "../../../utils/Random";

export class RestaurantAddForm extends HTMLFormElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div is="input-box" class="form-item form-item--required" inputid="category" name="category" labelText="카테고리" isselect></div>
      <div is="input-box" class="form-item form-item--required" inputid="name" name="name" labelText="이름" ></div>
      <div is="input-box" class="form-item form-item--required" inputid="distance" name="distance" labelText="거리(도보 이동 시간)" isselect></div>
      <div is="input-box" class="form-item" inputid="description" name="description" labelText="설명" caption="메뉴 등 추가 정보를 입력해 주세요." istextarea></div>
      <div is="input-box" class="form-item" inputid="link" name="link" labelText="참고 링크" caption="매장 정보를 확인할 수 있는 링크를 입력해 주세요."></div>
      <div class="button-container">
          <button
              type="button"
              class="button button--secondary text-caption"
          >
              취소하기
          </button>
          <button class="button button--primary text-caption submit-button">
              추가하기
          </button>
      </div>
    `;
  }

  bindEvent(handleSubmit: (restaurant: Restaurant) => void) {
    this.querySelector(".button--secondary")?.addEventListener("click", () => {
      document.querySelector<Modal>(".modal")?.closeModal();
    });

    this.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      handleSubmit(this.getSubmitData());
      this.resetFormValues();
    });
  }

  getSubmitData(): Restaurant {
    const category = this.querySelector<InputBox>(
      "[inputid='category']"
    )?.getValue() as Category;
    const name =
      this.querySelector<InputBox>("[inputid='name']")?.getValue() ?? "";
    const distance = Number(
      this.querySelector<InputBox>("[inputid='distance']")?.getValue()
    ) as Distance;
    const description = this.querySelector<InputBox>(
      "[inputid='description']"
    )?.getValue();
    const link = this.querySelector<InputBox>("[inputid='link']")?.getValue();
    const like = false;
    const id = Random.generateUniqueId();

    return { category, name, distance, description, link, like, id };
  }

  resetFormValues() {
    this.reset();
  }
}

export const createRestaurantAddForm = () => {
  customElements.define("restaurant-add-form", RestaurantAddForm, {
    extends: "form",
  });
};
