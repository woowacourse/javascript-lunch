const $restaurantItem = (RESTAURANT_INFO) => {
    const restaurantItem = document.createElement('li');
    restaurantItem.classList.add('restaurant');
    
    restaurantItem.innerHTML += `<div class="restaurant__category">
            <img src="${RESTAURANT_INFO.categoryIcon}" alt="${RESTAURANT_INFO.categoryTitle}" class="category-icon">
          </div>`;
    restaurantItem.innerHTML += `<div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${RESTAURANT_INFO.name}</h3>
            <span class="restaurant__distance text-body">${RESTAURANT_INFO.distance}</span>
            <p class="restaurant__description text-body">${RESTAURANT_INFO.description}</p>
          </div>`;

    return restaurantItem;
}

export default $restaurantItem;