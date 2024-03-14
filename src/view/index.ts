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
import RestaurantList from "../domain/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal";

class View {
  private $target;

  private selectSection;
  private listSection;
  private formModal;
  private detailModal;

  constructor($target: HTMLElement, restaurantList: RestaurantList) {
    this.$target = $target;

    this.selectSection = new RestaurantSelectSection();
    this.listSection = new RestaurantListSection(restaurantList);
    this.formModal = new RestaurantFormModal(restaurantList);
    this.detailModal = new RestaurantDetailModal(restaurantList);

    this.renderInit();

    this.renderSelectSection();
    this.renderListSection();
    this.renderFormModal();
    this.renderDetailModal();

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
        <section class="restaurant-list-tab-container">
          <div class="restaurant-list-tab restaurant-list-tab__active">
            모든 음식점
          </div>
          <div class="restaurant-list-tab">자주 가는 음식점</div>
        </section>
        ${this.selectSection.renderInit()}

        ${this.listSection.renderInit()}

        ${this.formModal.renderInit()}

        ${this.detailModal.renderInit()}
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

  renderDetailModal() {}

  setEvents() {
    this.selectSection.setEvent(
      "change",
      this.renderListSection.bind(this.selectSection)
    );

    this.setEvent("click", this.formModal.openModal.bind(this));

    this.formModal.setEvent(
      "submit",
      this.renderListSection.bind(this.formModal)
    );
    this.formModal.setCloseEvent("click", this.formModal.closeModal);

    this.listSection.setEvent(
      "click",
      this.detailModal.openModal.bind(this.detailModal)
    );

    this.detailModal.setEvent("click", this.renderListSection.bind(this));
    this.detailModal.setCloseEvent(
      "click",
      this.detailModal.closeModal.bind(this.detailModal)
    );
  }

  private setEvent(type: string, listener: (event: Event) => void) {
    const $addRestaurantButton = document.querySelector(
      "#add-restaurant__button"
    ) as HTMLButtonElement;
    $addRestaurantButton.addEventListener(type, listener);
  }
}

export default View;
