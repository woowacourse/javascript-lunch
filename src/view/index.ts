import RestaurantSelectSection from "./components/RestaurantSelectSection";
import RestaurantListSection from "./components/RestaurantListSection";
import RestaurantFormModal from "./components/RestaurantFormModal";

class View {
  private selectSection;
  private listSection;
  private formModal;

  constructor($target: HTMLElement) {
    this.selectSection = new RestaurantSelectSection();
    this.listSection = new RestaurantListSection();
    this.formModal = new RestaurantFormModal();
    this.renderInit($target);
    this.renderListSection();
    this.setEvents();
  }

  renderInit($target: HTMLElement) {
    $target.innerHTML = /*html*/ `
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

  renderListSection() {
    this.listSection.renderRestauantList(this.selectSection.getFilterValues());
  }

  setEvents() {
    this.selectSection.setEvent("change", this.renderListSection.bind(this));

    this.setEvent("click", this.formModal.openModal);

    this.formModal.setFormEvent("submit", this.renderListSection.bind(this));
    this.formModal.setCloseEvent();
  }

  private setEvent(type: string, listener: (event: Event) => void) {
    const $addRestaurantButton = document.querySelector<HTMLButtonElement>(
      "#add-restaurant__button"
    );
    $addRestaurantButton?.addEventListener(type, listener);
  }
}

export default View;
