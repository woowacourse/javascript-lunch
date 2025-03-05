const restaurantCard = (restaurant) => {
  const { category, name, distance, description, link } = restaurant.info;
  const restaurantCard = document.createElement("li");
  restaurantCard.classList.add("restaurant");

  restaurantCard.innerHTML = `     
  <div class="restaurant__category">
    <img
      src="./category-korean.png"
      alt=${category}
      class="category-icon"
    />
  </div>
  <div class="restaurant__info">
    <h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body"
      >캠퍼스부터 ${distance}분 내</span
    >
    <p class="restaurant__description text-body">
     ${description}
    </p>
  </div>
`;
  return restaurantCard;
};

export default restaurantCard;
