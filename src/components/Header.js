import Component from "./core/Component.js";

class Header extends Component {
  template() {
    return /*html*/ `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./icons/add-button.png" alt="음식점 추가">
      </button>
    </header>
  `;
  }

  componentDidMount() {
    document
      .querySelector(".gnb__button")
      .addEventListener("click", this.props.openModal);
  }
}

export default Header;
