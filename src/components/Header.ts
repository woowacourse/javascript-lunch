import Component from "../common/Component";
import FormModal from "./FormModal";

export default class Header extends Component {
  render() {
    return /*html*/ `    
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
    `;
  }

  componentDidMount(): void {
    const $gnbButton = document.querySelector(".gnb__button");
    const $modalContainer = document.querySelector(".modal-container");
    const $modal = document.querySelector(".modal");
    $gnbButton?.addEventListener("click", () => {
      $modal?.classList.add("modal--open");
      new FormModal($modalContainer, {
        loadRestaurant: this.props.loadRestaurant,
      });
    });
  }
}
