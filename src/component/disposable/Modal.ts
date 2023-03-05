import { Category, TakingTime, Restaurant } from "@/type/type";
import { $ } from "@/utils/Dom";
import Select from "@/component/reusable/Select";

class Modal {
  categorySelect;
  distanceSelect;

  constructor() {
    const category = [
      "선택해 주세요",
      "한식",
      "중식",
      "일식",
      "양식",
      "아시안",
      "기타",
    ];
    const distance = ["선택해 주세요", "5", "10", "15", "20", "30"];

    this.categorySelect = new Select(
      { name: "category", id: "category", required: true },
      category
    );
    this.distanceSelect = new Select(
      { name: "takingTime", id: "takingTime", required: true },
      distance
    );
  }

  template() {
    return `<div class="modal">
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form class="modal-form">
        <div class="form-item form-item--required">
          <label for="category text-caption">카테고리</label>
          ${this.categorySelect.template()}
        </div>

        <div class="form-item form-item--required">
          <label for="name text-caption">이름</label>
          <input type="text" name="name" id="name" required>
        </div>

        <div class="form-item form-item--required">
          <label for="takingTime text-caption">거리(도보 이동 시간) </label>
         ${this.distanceSelect.template()}
        </div>

        <div class="form-item">
          <label for="description text-caption">설명</label>
          <textarea name="description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <div class="form-item">
          <label for="link text-caption">참고 링크</label>
          <input type="text" name="link" id="link">
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

  addEvent(makeTicket: (obj: Restaurant) => void) {
    $(".modal--close")?.addEventListener("click", () => {
      this.resetFormValues();
      this.closeModal();
    });

    $(".modal-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const $modal = $(".modal-form") as HTMLFormElement;
      const formData = Object.fromEntries(new FormData($modal).entries());
      const data = {
        name: formData.name as string,
        takingTime: formData.takingTime as TakingTime,
        category: formData.category as Category,
        link: formData.link as string,
        description: formData.description as string,
      };

      makeTicket(data);
      this.resetFormValues();
      this.closeModal();
    });
  }

  resetFormValues() {
    const modalForm = $(".modal-form") as HTMLFormElement;
    modalForm.reset();
  }

  closeModal() {
    $(".modal")?.classList.remove("modal--open");
  }
}

export default new Modal();
