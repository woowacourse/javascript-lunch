const $restaurantItem = (restaurantInfo) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");

  restaurantItem.innerHTML += `<div class="restaurant__category">
            <img src="${restaurantInfo.categoryIcon}" alt="${restaurantInfo.categoryTitle}" class="category-icon">
          </div>`;
  restaurantItem.innerHTML += `<div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${restaurantInfo.name}</h3>
            <span class="restaurant__distance text-body">${restaurantInfo.distance}</span>
            <p class="restaurant__description text-body">${restaurantInfo.description}</p>
          </div>`;

  return restaurantItem;
};

export default $restaurantItem;
