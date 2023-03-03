import { addButton } from "../assets";

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.handleClick();
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

  handleClick() {
    const addIcon = document.getElementById("addIcon");
    addIcon?.addEventListener("click", () => {
      const bottomSheet: any = document.getElementById("bottomSheet");
      bottomSheet?.open();
      bottomSheet?.render("<add-restaurant />");
    });
  }
}

export default NavBar;
