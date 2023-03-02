export default class RestaurantItem {
  render({ category, storeName, distance, detail }) {
    return `
        <li class="restaurant">
        <div class="restaurant__category">
          <img src="../../templates/category-korean.png" alt="${category}" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${storeName}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${detail}</p>
        </div>
      </li>
        `;
  }
}
