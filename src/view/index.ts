import "../../templates/style.css";
import "../../templates/add-button.png";
import "../../templates/category-asian.png";
import "../../templates/category-chinese.png";
import "../../templates/category-etc.png";
import "../../templates/category-japanese.png";
import "../../templates/category-korean.png";
import "../../templates/category-western.png";
import "../../templates/favorite-icon-filled.png";
import "../../templates/favorite-icon-lined.png";
import RestaurantSelectSection from "./components/RestaurantSelectSection";
import RestaurantListSection from "./components/RestaurantListSection";
import RestaurantFormModal from "./components/RestaurantFormModal";

class View {
  private $target;
  private selectSection;
  private listSection;
  private formModal;

  constructor($target: HTMLElement) {
    this.$target = $target;

    this.selectSection = new RestaurantSelectSection();
    this.listSection = new RestaurantListSection();
    this.formModal = new RestaurantFormModal();

    this.renderInit();

    this.renderSelectSection();
    this.renderListSection();
    this.renderFormModal();

    this.setEvents();
  }

  renderInit() {
    this.$target.innerHTML = /*html*/ `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button
          type="button"
          class="gnb__button"
          id="add-restaurant__button"
          aria-label="음식점 추가"
        >
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
      </header>

      <main>
        ${this.selectSection.renderInit()}

        ${this.listSection.renderInit()}

        ${this.formModal.renderInit()}
      </main>`;
  }

  renderSelectSection() {
    this.selectSection.renderCategory();
    this.selectSection.renderSorting();
  }

  renderListSection() {
    this.listSection.renderRestaurantList(this.selectSection.getFilterValues());
  }

  renderFormModal() {
    this.formModal.renderCategory();
    this.formModal.renderDistance();
  }

  setEvents() {
    this.selectSection.setEvent("change", this.renderListSection.bind(this));

    this.setEvent("click", this.formModal.openModal.bind(this));

    this.formModal.setEvent("submit", this.renderListSection.bind(this));
    this.formModal.setCloseEvent("click", this.formModal.closeModal.bind(this));
  }

  private setEvent(type: string, listener: (event: Event) => void) {
    const $addRestaurantButton = document.querySelector(
      "#add-restaurant__button"
    ) as HTMLButtonElement;
    $addRestaurantButton.addEventListener(type, listener);
  }
}

export default View;
