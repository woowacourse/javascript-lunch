class RestaurantInfo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    const restaurant = this.getAttribute('restaurant');

    this.innerHTML = this.template(restaurant);
  }

  setEvent() {}

  removeEvent() {}

  displayCategoryIcon(category) {
    switch (category) {
      case '한식':
        return `<img src="./category-korean.png" alt="한식" class="category-icon" />`;
      case '중식':
        return `<img src="./category-chinese.png" alt="중식" class="category-icon" />`;
      case '일식':
        return `<img src="./category-japanese.png" alt="일식" class="category-icon" />`;
      case '양식':
        return `<img src="./category-westurn.png" alt="양식" class="category-icon" />`;
      case '아시안':
        return `<img src="./category-asian.png" alt="아시안" class="category-icon" />`;
      case '기타':
        return `<img src="./category-etc.png" alt="기타" class="category-icon" />`;
      default:
        return '';
    }
  }

  template(restaurant) {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          ${displayCategoryIcon(restaurant.category)}
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
          <p class="restaurant__description text-body">
            ${restaurant.description}
          </p>
        </div>
      </li>
    `;
  }
}

export default RestaurantInfo;
