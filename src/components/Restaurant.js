import { translateCategory } from "../constant/variables";
import Modal from "./Modal";
import Star from "./Star";

export default class Restaurant {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
    this.$modal = document.querySelector(".modal");
  }

  template() {
    const { name, category, distance, description } = this.props;

    return `
    <li>
        <div class="relative">
         <div class="item-star star-container absolute right-0"></div>
        </div>
        <div class="restaurant" id=${name}>
        <div class="restaurant__category">
          <img
            src="./category-${translateCategory[category]}.png"
            alt="${category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${distance}분 내</span
          >
          <p class="restaurant__description text-body">
            ${description}
          </p>
        </div>
      </div>
    </li>
        `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
    this.mounted();
  }

  mounted() {
    const { index } = this.props;
    const $starContainer = document.querySelectorAll(".item-star");
    new Star($starContainer[index], this.props);
  }

  setEvent() {
    const { name, render } = this.props;
    this.$restaurantItem = this.$target.querySelector("#" + name);
    this.$restaurantItem.addEventListener("click", () => {
      new Modal(this.$modal, { ...this.props, content: "restaurantDetail", render });
      this.$modal.classList.toggle("modal--open");
    });
  }
}
