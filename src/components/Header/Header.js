import Component from "../Component.js";
import ModalAdd from "../Modal/ModalAdd.js";
class Header extends Component {
  constructor($target) {
    super($target);
  }

  template() {
    return `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가" />
      </button>`;
  }

  setEvent() {
    this.$target.querySelector(".gnb__button").addEventListener("click", () => {
      const modalContainer = document.querySelector(".modal");
      new ModalAdd(modalContainer, { mode: "add" });
      modalContainer.classList.toggle("modal--open");
    });
  }
}

export default Header;
