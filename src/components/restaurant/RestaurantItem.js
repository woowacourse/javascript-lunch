import createElement from "../../util/createElement";

export default function RestaurantItem({
  id,
  src,
  alt,
  name,
  distance,
  description,
}) {
  const $restaurantItem = createElement({
    tag: "li",
    classNames: ["restaurant"],
    id: id,
  });

  $restaurantItem.innerHTML = `
        <div class="restaurant__category">
            <img src=${src} alt=${alt} class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">${distance}</span>
            <p class="restaurant__description text-body">${description}</p>
        </div>`;

  return $restaurantItem;
}
