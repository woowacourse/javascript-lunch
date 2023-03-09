export default class RestaurantItem {
  #restaurantImage;
  #favoriteImage;

  constructor(restaurantImage, favoriteImage) {
    this.#restaurantImage = restaurantImage;
    this.#favoriteImage = favoriteImage;
  }

  render({ category, storeName, distance, detail, shape }) {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="${this.#restaurantImage[category]}" alt="${category}" class="category-icon">
        </div>
        <div class="restaurant__detail">
          <div class="restaurant__header">
            <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${storeName}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            </div>
            <div class="favorite__shape">
              <img src="${this.#favoriteImage[shape]}" alt="${shape}" class="category-icon">
            </div>
          </div>
          <p class="restaurant__description text-body">${detail}</p>
        </div>
      </li>`;
  }
}
