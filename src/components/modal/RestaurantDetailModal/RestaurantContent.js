const RestaurantContent = ({ restaurant }) => {
  return /*html */ `
    <div class="mt-16 gap-16 mb-32">
      <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
      <p class="text-body">${restaurant.description}</p>
      <a href="${restaurant.link}" class="text-caption link" target="_blank" rel="noopener noreferrer">${restaurant.link}</a>
    </div>
  `;
};

export default RestaurantContent;
