import { CATEGORIES, DISTANCES, DISTANCE_MAPPER } from "../../constants";
import restaurantList from "../../domain/RestaurantList";
import { Category, Distance, Link, Restaurant } from "../../types";
import { isCategory, isDistance, isLink } from "../../util";

class RestaurantFormModal {
  renderInit() {
    return /*html*/ `
      <div class="modal" id="add-restaurant-form__modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form id="restaurant-form">
            <!-- 카테고리 -->
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
              <select name="category" id="category" required>
                <option value="">선택해 주세요</option>
              </select>
            </div>

            <!-- 음식점 이름 -->
            <div class="form-item form-item--required">
              <label for="name text-caption">이름</label>
              <input type="text" name="name" id="name" required />
            </div>

            <!-- 거리 -->
            <div class="form-item form-item--required">
              <label for="distance text-caption">거리(도보 이동 시간) </label>
              <select name="distance" id="distance" required>
                <option value="">선택해 주세요</option>
              </select>
            </div>

            <!-- 설명 -->
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

            <!-- 링크 -->
            <div class="form-item">
              <label for="link text-caption">참고 링크</label>
              <input type="text" name="link" id="link" />
              <span class="help-text text-caption"
                >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
              >
            </div>

            <!-- 취소/추가 버튼 -->
            <div class="button-container">
              <button
                type="button"
                class="button button--secondary text-caption"
                id="add-restaurant-cancel__button"
              >
                취소하기
              </button>
              <button class="button button--primary text-caption">
                추가하기
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  renderCategory() {
    const $formCategory =
      document.querySelector<HTMLSelectElement>("#category");

    const formCategoryFragment = new DocumentFragment();
    CATEGORIES.forEach((category) => {
      const categoryTag = document.createElement("option");
      categoryTag.value = category;
      categoryTag.textContent = category;
      formCategoryFragment.append(categoryTag);
    });
    $formCategory?.appendChild(formCategoryFragment);
  }

  renderDistance() {
    const $formDistance =
      document.querySelector<HTMLSelectElement>("#distance");

    const distanceFragment = new DocumentFragment();
    DISTANCES.forEach((distance) => {
      const distanceTag = document.createElement("option");
      distanceTag.value = distance.toString();
      distanceTag.textContent = DISTANCE_MAPPER[distance];
      distanceFragment.append(distanceTag);
    });
    $formDistance?.appendChild(distanceFragment);
  }

  openModal() {
    const $addRestaurantFormModal = document.querySelector<HTMLDivElement>(
      "#add-restaurant-form__modal"
    );
    $addRestaurantFormModal?.classList.add("modal--open");
  }

  closeModal() {
    const $addRestaurantFormModal = document.querySelector<HTMLDivElement>(
      "#add-restaurant-form__modal"
    );
    $addRestaurantFormModal?.classList.remove("modal--open");
  }

  setFormEvent(type: string, listener: (event: Event) => void) {
    const $restaurantForm =
      document.querySelector<HTMLFormElement>("#restaurant-form");

    $restaurantForm?.addEventListener(type, (e) => {
      e.preventDefault();
      try {
        this.addRestaurant(e);
        this.closeModal();
        listener(e);
      } catch (error: any) {
        alert(error.message);
      }
    });
  }

  setCloseEvent(type: string, listener: (event: Event) => void) {
    const $addRestaurantCancelButton =
      document.querySelector<HTMLButtonElement>(
        "#add-restaurant-cancel__button"
      );

    $addRestaurantCancelButton?.addEventListener(type, (e: Event) => {
      const $restaurantForm =
        document.querySelector<HTMLFormElement>("#restaurant-form");
      $restaurantForm?.reset();

      listener(e);
    });
  }

  private addRestaurant(e: Event) {
    const $restaurantForm = e.target as HTMLFormElement;
    const formData = new FormData($restaurantForm);
    const category = formData.get("category");
    const name = formData.get("name");
    const distance = Number(formData.get("distance"));
    const description = formData.get("description");
    const link = formData.get("link");

    if (!isCategory(category)) {
      throw new Error("잘못된 카테고리입니다.");
    }

    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("잘못된 이름입니다");
    }

    if (!isDistance(distance)) {
      throw new Error("잘못된 거리값입니다");
    }

    if (typeof description !== "string") {
      throw new Error("잘못된 상세설명입니다");
    }

    if (!"" || !isLink(link)) {
      throw new Error("잘못된 링크입니다.");
    }

    restaurantList.add({ category, name, distance, description, link });
    $restaurantForm.reset();
  }
}

export default RestaurantFormModal;
