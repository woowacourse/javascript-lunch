const $restaurantItem = ({ categoryIcon, categoryTitle, name, distance, description }) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");

  restaurantItem.innerHTML += `<div class="restaurant__category">
            <img src="${categoryIcon}" alt="${categoryTitle}" class="category-icon">
          </div>`;
  restaurantItem.innerHTML += `<div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">${distance}</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>`;

  return restaurantItem;
};

export default $restaurantItem;
