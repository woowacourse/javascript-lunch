import { $ } from "../utils/selector.js";
import Component from "./core/Component.js";

class Header extends Component {
  template() {
    const { title, ariaLabel, dataTestId, iconImageSource, alt } =
      this.props.data;

    return /*html*/ `
      <header class="gnb">
        <h1 class="gnb__title text-title">${title}</h1>
        <button type="button" class="gnb__button" aria-label=${ariaLabel} data-testid=${dataTestId}>
          <img src=${iconImageSource} alt=${alt}>
        </button>
      </header>
    `;
  }

  componentDidMount() {
    const buttonCallback = this.props.buttonCallback;

    const $gnbButton = $(document, ".gnb__button");
    $gnbButton.addEventListener("click", buttonCallback);
  }
}

export default Header;
