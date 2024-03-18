import Component from "../common/Component";
import { Category, RestaurantType } from "../types";
import RestauranStorage from "../domain/RestaurantStorage";
import { CATEGORIES, DISTANCES } from "../constants";
import { isDistance, isLink, isCategory } from "../util";

export default class FormModal extends Component {
  render(): string {
    return /*html*/ `
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form class="restaurant-form">
          <!-- 카테고리 -->
          <div class="form-item form-item--required">
            <label for="category text-caption">카테고리</label>
            <select name="category" id="category" required>
              <option value="">선택해 주세요</option>
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="양식">양식</option>
              <option value="아시안">아시안</option>
              <option value="기타">기타</option>
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
              <option value="5">5분 내</option>
              <option value="10">10분 내</option>
              <option value="15">15분 내</option>
              <option value="20">20분 내</option>
              <option value="30">30분 내</option>
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
              class="button form-cancel button--secondary text-caption"
            >
              취소하기
            </button>
            <button class="button button--primary text-caption">
              추가하기
            </button>
          </div>
        </form>
        `;
  }

  componentDidMount(): void {
    const { loadRestaurant } = this.props;
    const $restaurantForm =
      document.querySelector<HTMLFormElement>(".restaurant-form");
    const $formCancel =
      document.querySelector<HTMLButtonElement>(".form-cancel");
    const $modal = document.querySelector<HTMLDivElement>(".modal");

    $restaurantForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData($restaurantForm);
      const category = formData.get("category");
      try {
        if (!isCategory(category)) {
          throw new Error("잘못된 카테고리입니다.");
        }
      } catch (error: any) {
        alert(error.message);
      }
      category;
      const name = formData.get("name") || "";
      const distance = Number(formData.get("distance"));
      const description = formData.get("description");
      const link = formData.get("link");
      const bookmark = false;
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

      if (link !== "" && !isLink(link)) {
        throw new Error("잘못된 링크입니다.");
      }
      RestauranStorage.addRestaurant({
        category,
        name,
        distance,
        description,
        link,
        bookmark,
      });
      loadRestaurant();
    });

    $formCancel?.addEventListener("click", (e) => {
      $modal?.classList.remove("modal--open");
    });
  }
}
