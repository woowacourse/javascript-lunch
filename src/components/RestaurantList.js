const RestaurantList = (restaurants) => {
  return /* html */ `
   <section class="restaurant-list-container">
      <ul class="restaurant-list">
      ${restaurants
        .map(
          ({ src, alt, name, distance, description }) => /*html */ `
          <li class="restaurant">
              <div class="restaurant__category">
                <img src="${src}" alt="${alt}" class="category-icon">
              </div>
              <div class="restaurant__info">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description text-body">${description}</p>
              </div>
            </li>
      `
        )
        .join("")}
      </ul>
    </section>
    `;
};

export default RestaurantList;
