class Header {
  constructor(title, $parent) {
    this.addHeaderComponent(title, $parent);
  }
  addHeaderComponent(title, $parent) {
    const header = document.createElement("header");

    header.innerHTML = `
          <header class="gnb">
        <h1 class="gnb__title text-title">${title}</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./public/images/add-button.png" alt="음식점 추가" />
        </button>
      </header>
    `;
    $parent.appendChild(header);
  }

  openModal() {}
}

export default Header;
