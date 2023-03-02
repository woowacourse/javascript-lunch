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
      <button id="addIcon" type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="../templates/add-button.png" alt="음식점 추가">
      </button>
    <header>
  `
    );
    this.handleClick();
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
