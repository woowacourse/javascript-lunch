export default function RestaurantItem(container, restaurantData) {
  const {
    categoryCode,
    categoryValue,
    nameValue,
    distanceValue,
    descriptionValue,
  } = restaurantData;

  container.innerHTML += `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="./category-${categoryCode}.png" alt="${categoryValue}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${nameValue}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distanceValue}분 내</span>
        <p class="restaurant__description text-body">${descriptionValue}</p>
      </div>
    </li>
  `;
}
