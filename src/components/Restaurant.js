import translateCategory from "../util/translateCategory";
import Modal from "./Modal";

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
        <li class="restaurant" id=${name}>
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
      </li>
        `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {
    const { name } = this.props;
    this.$restaurantItem = this.$target.querySelector("#" + name);
    this.$restaurantItem.addEventListener("click", () => {
      new Modal(this.$modal, { ...this.props, content: "restaurantDetail" });
      this.$modal.classList.toggle("modal--open");
    });
    // this.addEvent('click',"#" + name,()=>{
    //   new Modal(this.$modal, { ...this.props, content: "restaurantDetail" });
    //   this.$modal.classList.toggle("modal--open");
    // })
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
