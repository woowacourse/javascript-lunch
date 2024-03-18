import { categories, distances, distancesMapper } from "../../constants";
import {
  Category,
  Distance,
  Restaurant,
  isCategory,
  isDistance,
  isLink,
} from "../../types";
import BaseComponent from "../../util/BaseComponent";

interface Props {
  onFormSubmit: (restaurant: Restaurant) => void;
}

interface State {}

class RestaurantFormModal extends BaseComponent<Props, State> {
  protected state: State;

  constructor(props: Props) {
    const modal = document.createElement("div");
    modal.classList.add("modal", "modal--open");
    modal.id = "add-restaurant-form__modal";
    super(modal, props);
    this.state = {};
  }

  protected setEvent(): void {
    this.addEvent("button#add-restaurant-cancel__button", "click", () => {
      this.$root.remove();
    });

    this.addEvent("form#restaurant-form", "submit", (event: Event) => {
      event.preventDefault();
      if (event.target instanceof HTMLFormElement) {
        const restaurant = this.generateRestaurant(new FormData(event.target));
        this.props.onFormSubmit(restaurant);
        this.$root.remove();
      }
    });
  }

  private generateRestaurant(formData: FormData): Restaurant {
    const category = formData.get("category");
    const name = formData.get("name");
    const distance = formData.get("distance");
    const description = formData.get("description");
    const link = formData.get("link");

    this.validateFormData({ category, name, distance, description, link });

    const restaurant: Restaurant = {
      id: Date.now(),
      category: category as Category,
      name: name as string,
      distance: Number(distance) as Distance,
      isGoTo: false,
      description:
        typeof description === "string" && description.trim().length > 0
          ? description
          : undefined,
      link: typeof link === "string" && isLink(link) ? link : undefined,
    };

    return restaurant;
  }

  private validateFormData({
    category,
    name,
    distance,
    description,
    link,
  }: {
    category: FormDataEntryValue | null;
    name: FormDataEntryValue | null;
    distance: FormDataEntryValue | null;
    description: FormDataEntryValue | null;
    link: FormDataEntryValue | null;
  }) {
    if ([category, name, distance, description, link].includes(null)) {
      throw new Error("누락된 폼 데이터가 있습니다.");
    }

    if (
      typeof category !== "string" ||
      typeof name !== "string" ||
      typeof distance !== "string" ||
      typeof description !== "string" ||
      typeof link !== "string"
    ) {
      throw new Error("잘못된 폼 데이터 타입이 있습니다.");
    }

    if (category.trim().length === 0) {
      throw new Error("카테고리를 선택해주세요.");
    }
    if (name.trim().length === 0) {
      throw new Error("이름을 입력해주세요.");
    }
    if (distance.trim().length === 0) {
      throw new Error("거리를 선택해주세요.");
    }

    if (!isCategory(category)) {
      throw new Error("카테고리가 잘못 선택되었습니다.");
    }
    if (!isDistance(Number(distance))) {
      throw new Error("거리가 잘못 선택되었습니다.");
    }
    if (link.trim().length > 0 && !isLink(link)) {
      throw new Error("참고 링크가 잘못 입력되었습니다.");
    }
  }

  protected compose(): void {
    this.$root.innerHTML = this.innerHTML();
  }

  private innerHTML(): string {
    return /*html*/ `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form id="restaurant-form">
            <!-- 카테고리 -->
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
              <select name="category" id="category" >
                <option value="">선택해 주세요</option>
                ${categories.map(
                  (category) =>
                    /*html*/ `<option value=${category}>${category}</option>`
                )}
              </select>
            </div>

            <!-- 음식점 이름 -->
            <div class="form-item form-item--required">
              <label for="name text-caption">이름</label>
              <input type="text" name="name" id="name"  />
            </div>

            <!-- 거리 -->
            <div class="form-item form-item--required">
              <label for="distance text-caption">거리(도보 이동 시간) </label>
              <select name="distance" id="distance" >
                <option value="">선택해 주세요</option>
                ${distances.map(
                  (distance) =>
                    /*html*/ `<option value=${distance}>${distancesMapper[distance]}</option>`
                )}
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
    `;
  }
}

export default RestaurantFormModal;
