import { addButton } from "../assets";
import styleClass from "../constants/styleClass";
import BottomSheet from "./BottomSheet";
import { openBottomSheet } from "./BottomSheet/handleBottomSheet";

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.onClickAddIcon();
  }

  render() {
    this.innerHTML = `
      <header class="gnb">
        <h1 class="${styleClass.gnb.title} ${styleClass.text.title}">점심 뭐 먹지</h1>
        <button id="addIcon" type="button" class="${styleClass.gnb.button}" aria-label="음식점 추가">
          <img id="addButtonImage" src=${addButton} alt="음식점 추가">
        </button>
      </header>
      `;
  }

  onClickAddIcon() {
    const addIcon = document.getElementById("addIcon");
    addIcon?.addEventListener("click", () => {
      openBottomSheet("<add-restaurant></add-restaurant>");
    });
  }
}

export default NavBar;
