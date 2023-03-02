class NavBar extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.insertAdjacentHTML(
      "afterbegin",
      `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button id="addButton" type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="../templates/add-button.png" alt="음식점 추가">
      </button>
    <header>
  `
    );
    this.handleClick();
  }

  handleClick() {
    const addButton = document.getElementById("addButton");
    addButton?.addEventListener("click", () => {
      const bottomSheet: any = document.getElementById("bottomSheet");
      bottomSheet?.open();
    });
  }
}

export default NavBar;
