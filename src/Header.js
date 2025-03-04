import Component from "./core/Component";

class Header extends Component {
  constructor($parent, props) {
    super($parent, props);
  }

  template() {
    this.$parent.insertAdjacentHTML(
      "afterend",
      `
      <header class="gnb">
        <h1 class="gnb__title text-title">${this.props.title}</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./public/images/add-button.png" alt="음식점 추가" />
        </button>
      </header>
    `
    );
  }
}

export default Header;
