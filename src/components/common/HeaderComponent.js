import CustomElement from "../../abstracts/CustomElement";

class HeaderComponent extends CustomElement {
  showModal() {
    document.querySelector(".modal").classList.add("modal--open");
  }

  setEvent() {
    document
      .querySelector(".gnb__button")
      .addEventListener("click", this.showModal);
  }

  template() {
    return `
    <header class="head">
      <section class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
      </section>
      <section class="menu">
        <h1 class="text-title">모든 음식점</h1>
        <h1 class="text-title">자주 가는 음식점</h1>
        </button>
      </section>
    </header>
    `;
  }
}

customElements.define("header-element", HeaderComponent);

export default HeaderComponent;
