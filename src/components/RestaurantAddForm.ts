import restaurantState from "../states/restaurant";
import { Category, Distance, Restaurant } from "../types/restaurant";
import CustomSelect from "./CustomSelect";

class RestaurantAddForm extends HTMLFormElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.bindEvent();
  }

  render() {
    this.innerHTML = `
      <div class="form-item form-item--required">
        <label for="category text-caption">카테고리</label>
        <select is="custom-select" name="category" id="category" required></select>
      </div>
      <div class="form-item form-item--required">
        <label for="name text-caption">이름</label>
        <input type="text" name="name" id="name" required />
      </div>
      <div class="form-item form-item--required">
        <label for="distance text-caption">거리(도보 이동 시간)</label>
        <select is="custom-select" name="distance" id="distance" required></select>
      </div>
      <div class="form-item">
        <label for="description text-caption">설명</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
        ></textarea>
        <span class="help-text text-caption"
          >메뉴 등 추가 정보를 입력해 주세요.</span
        >
      </div>
      <div class="form-item">
        <label for="link text-caption">참고 링크</label>
        <input type="text" name="link" id="link" />
        <span class="help-text text-caption"
          >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
        >
      </div>
      <div class="button-container">
        <button
          type="button"
          id="cancel-button"
          class="button button--secondary text-caption"
        >
          취소하기
        </button>
        <button class="button button--primary text-caption">
          추가하기
        </button>
      </div>
    `;
  }

  bindEvent() {
    this.addEventListener("submit", this.onSubmit.bind(this));
    this.querySelector("#cancel-button")?.addEventListener(
      "click",
      this.onClickCancelButton.bind(this)
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const newRestaurant = this.createRestaurant();

    restaurantState.update(newRestaurant);
    // close modal
  }

  onClickCancelButton() {
    this.reset();
    // close modal
  }

  createRestaurant(): Restaurant {
    const category = this.querySelector<CustomSelect>("#category")
      ?.value as Category;
    const name = this.querySelector<HTMLInputElement>("#name")?.value || "";
    const distance = Number(
      this.querySelector<CustomSelect>("#distance")?.value
    ) as Distance;
    const description =
      this.querySelector<HTMLTextAreaElement>("#description")?.value;
    const link = this.querySelector<HTMLInputElement>("#link")?.value;

    return { category, name, distance, description, link };
  }
}

export default RestaurantAddForm;
