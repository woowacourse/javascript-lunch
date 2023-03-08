import translateCategory from "../util/translateCategory";

export default class RestaurantDetail {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  render() {
    const { category, name, distance, description, link } = this.props;
    this.$target.innerHTML = `
    <div>
    <div class="flex justify-between">
      <div class="restaurant__category">
        <img src="./category-${translateCategory[category]}.png" alt="${category}" class="category-icon" />
      </div>
      <img src="./favorite-icon-filled.png" class="star-icon" />
    </div>
  </div>
  <h2 class="mt-16">${name}</h1>
  <div>
    <p class="mt-16 text-body restaurant__distance">캠퍼스로부터 ${distance}분 내</p>
    <div class="mt-16">${description}</div>
    <a href="${link}">${link}</a>
    <div class="mt-16 button-container">
    <button id="remove-button" class="button button--secondary text-caption">
    삭제하기
</button>
    <button id="quit-button" type="button" class="button button--primary text-caption">
    닫기
    </button>
    </div>
  </div>
  `;
  }

  setEvent() {
    const $modal = document.querySelector(".modal");
    this.addEvent("click", "#quit-button", () => {
      $modal.classList.toggle("modal--open");
    });
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
