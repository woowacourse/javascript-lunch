import Component from "../common/Component";
import FormModal from "./FormModal";

interface HeaderProps {
  loadRestaurant: Function;
}

export default class Header extends Component<HTMLElement, HeaderProps> {
  render() {
    return /*html*/ `    
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
    `;
  }

  setEvents(): void {
    if (!this.props) return;
    const { loadRestaurant } = this.props;
    const $gnbButton =
      document.querySelector<HTMLButtonElement>(".gnb__button");
    const $modalContainer =
      document.querySelector<HTMLDivElement>(".modal-container");
    const $modal = document.querySelector<HTMLDivElement>(".modal");
    if ($modalContainer) {
      $gnbButton?.addEventListener("click", () => {
        $modal?.classList.add("modal--open");
        new FormModal($modalContainer, {
          loadRestaurant,
        });
      });
    }
  }
}
