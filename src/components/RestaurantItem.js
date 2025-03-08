export function RestaurantItem(container, inputValue) {
  container.innerHTML += `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="./category-${inputValue.categoryCode}.png" alt="${inputValue.categoryValue}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${inputValue.nameValue}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${inputValue.distanceValue}</span>
        <p class="restaurant__description text-body">${inputValue.descriptionValue}</p>
      </div>
    </li>
  `;
}

export function DefaultRestaurantItem(inputValue) {
  return `
  <li class="restaurant">
    <div class="restaurant__category">
      <img src="./category-${inputValue.category}.png" alt="${inputValue.categoryValue}" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${inputValue.nameValue}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${inputValue.distanceValue}</span>
      <p class="restaurant__description text-body">${inputValue.descriptionValue}</p>
    </div>
  </li>
`;
}
