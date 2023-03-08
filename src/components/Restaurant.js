import translateCategory from "../util/translateCategory";

export default class Restaurant {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
  }

  template() {
    const { name, category, distance, description } = this.props;

    return `
        <li class="restaurant">
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
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }
}
