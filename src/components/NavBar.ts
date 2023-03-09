import { addButton } from "../assets";
import BottomSheet from "./BottomSheet";

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.onClickAddIcon();
  }

  render() {
    this.innerHTML = `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button id="addIcon" type="button" class="gnb__button" aria-label="음식점 추가">
          <img id="addButtonImage" src=${addButton} alt="음식점 추가">
        </button>
      </header>
      `;
  }

  onClickAddIcon() {
    const addIcon = document.getElementById("addIcon");
    addIcon?.addEventListener("click", () => {
      const bottomSheet = document.getElementById("bottomSheet");
      if (bottomSheet instanceof BottomSheet) {
        bottomSheet.open("<add-restaurant></add-restaurant>");
      }
    });
  }
}

export default NavBar;
