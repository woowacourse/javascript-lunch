import { Category, TakingTime, AddRestaurant, Rerender } from "@/type/type";
import { $ } from "@/utils/Dom";
import Select from "@/component/common/Select";
import { CATEGORY, TAKING_TIME, OptionValue } from "@/constant/Restaurant";
import { generateId } from "@/utils/generateId";

class AddModal {
  categorySelect;
  takingTimeSelect;

  constructor() {
    this.categorySelect = new Select(
      { name: "category", id: "category", required: true },
      [OptionValue.PLACE_HOLDER, ...CATEGORY]
    );
    this.takingTimeSelect = new Select(
      { name: "takingTime", id: "takingTime", required: true },
      [OptionValue.PLACE_HOLDER, ...TAKING_TIME]
    );
  }

  template() {
    return `<div class="modal">
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form class="modal-form">
        <div class="form-item form-item--required category--input">
          <label for="category">카테고리</label>
          ${this.categorySelect.template()}
        </div>

        <div class="form-item form-item--required name--input">
          <label for="name">이름</label>
          <input type="text" name="name" id="name">
        </div>

        <div class="form-item form-item--required taking_time--input">
          <label for="takingTime text-caption">거리(도보 이동 시간) </label>
         ${this.takingTimeSelect.template()}
        </div>

        <div class="form-item">
          <label for="description">설명</label>
          <textarea name="description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <div class="form-item">
          <label for="link">참고 링크</label>
          <input type="url" name="link" id="link">
          <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
        </div>

        <div class="button-container">
          <button type="button" class="button button--secondary text-caption modal--close">취소하기</button>
          <button type="submit" class="button button--primary text-caption modal--submit">추가하기</button>
        </div>
      </form>
    </div>
  </div>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent(addNewRestaurant: AddRestaurant, rerenderList: Rerender) {
    $(".modal--close")?.addEventListener("click", () => {
      this.closeModal();
    });

    $(".modal-backdrop")?.addEventListener("click", () => {
      this.closeModal();
    });

    $(".modal-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.deleteErrorMessage();

      const restaurant = this.getRestaurantData();

      try {
        addNewRestaurant(restaurant);
        rerenderList();
        this.closeModal();
      } catch (e) {
        const error = (e as string).toString();
        const [errorTarget, errorMessage] = error.split(":");
        this.showErrorMessage(errorTarget, errorMessage);
      }
    });
  }

  getRestaurantData() {
    const $modal = $(".modal-form") as HTMLFormElement;
    const formData = Object.fromEntries(new FormData($modal).entries());
    const restaurant = {
      id: generateId(),
      name: (formData.name as string).trim(),
      takingTime: Number(formData.takingTime) as TakingTime,
      category: formData.category as Category,
      link: formData.link as string,
      description: formData.description as string,
      bookmarked: false,
    };

    return restaurant;
  }

  resetForm() {
    const modalForm = $(".modal-form") as HTMLFormElement;
    modalForm.reset();
    this.deleteErrorMessage();
  }

  openModal() {
    $(".modal")?.classList.add("modal--open");
  }

  closeModal() {
    this.resetForm();
    $(".modal")?.classList.remove("modal--open");
  }

  showErrorMessage(target: string, message: string) {
    $(`.${target}--input`)?.insertAdjacentHTML(
      "beforeend",
      `<div class='error--message'>${message}</div>`
    );
  }

  deleteErrorMessage() {
    $(".error--message")?.remove();
  }
}

export default new AddModal();
