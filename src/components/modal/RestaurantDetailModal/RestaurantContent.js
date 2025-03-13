const RestaurantContent = ({ restaurant }) => {
  const imageSource = {
    한식: "category-korean.png",
    중식: "category-chinese.png",
    일식: "category-japanese.png",
    양식: "category-western.png",
    아시안: "category-asian.png",
    기타: "category-etc.png",
  };

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
