import Component from "../Component.js";
import Modal from "../Modal/Modal.js";
class Header extends Component {
  constructor($target) {
    super($target);
  }

  template() {
    return `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="../templates/add-button.png" alt="음식점 추가" />
      </button>`;
  }

  setEvent() {
    this.$target.querySelector(".gnb__button").addEventListener("click", () => {
      const modalContainer = document.querySelector(".modal");
      new Modal(modalContainer);
      modalContainer.classList.toggle("modal--open");
    });
  }
}

export default Header;
