import BaseComponent from "../../util/BaseComponent";

interface Props {
  onButtonClick: () => void;
}

interface State {}

class Header extends BaseComponent<Props, State> {
  protected state: State;

  constructor(props: Props) {
    const $root = document.createElement("header");
    $root.classList.add("gnb");
    super($root, props);
    this.state = {};
  }

  protected setEvent(): void {
    this.addEvent(".gnb__button", "click", this.props.onButtonClick);
  }

  protected compose(): void {
    this.$root.innerHTML = this.innerHTML();
  }

  private innerHTML(): string {
    return /*html*/ `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="add-button.png" alt="음식점 추가" />
      </button>
    `;
  }
}

export default Header;
