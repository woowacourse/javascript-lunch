import RestaurantDetailModal from "../modal/RestaurantDetailModal/index.js";
import RestaurantItem from "./RestaurantItem.js";

const createTemplateElement = (restaurants) => {
  const htmlString = /* html */ `
    <section class="restaurant-list-container">
      <ul id="restaurant-list" class="restaurant-list" data-testid="restaurant-list">
        ${restaurants.map(RestaurantItem).join("")}
      </ul>
    </section>
  `;

  const $template = document.createElement("template");
  $template.innerHTML = htmlString.trim();
  return $template.content.firstElementChild;
};

const handleFavoriteClick = (
  event,
  onToggleFavorite,
  restaurants,
  updateList
) => {
  const $target = event.target;
  if (!$target.classList.contains("favorite-icon")) return;

  const $li = $target.closest(".restaurant");
  if (!$li) return;

  const id = $li.dataset.id;
  onToggleFavorite?.(id);

  const targetRestaurant = restaurants.find(
    (restaurant) => restaurant.id === id
  );
  if (targetRestaurant) {
    updateList();
  }
};

const handleRestaurantClick = (
  event,
  restaurants,
  onToggleFavorite,
  onDeleteRestaurant
) => {
  const $target = event.target;
  if ($target.classList.contains("favorite-icon")) return;

  const $li = $target.closest(".restaurant");
  if (!$li) return;

  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === $li.dataset.id
  );
  if (!restaurant) return;

  const $detailModal = new RestaurantDetailModal(
    document.querySelector("#modal"),
    {
      restaurant,
      onToggleFavorite,
      onDeleteRestaurant,
    }
  );

  $detailModal.open();
};

const RestaurantList = (
  restaurants,
  { onToggleFavorite, onDeleteRestaurant, updateList }
) => {
  const $element = createTemplateElement(restaurants);
  const $ul = $element.querySelector("#restaurant-list");

  $ul.addEventListener("click", (event) => {
    handleFavoriteClick(event, onToggleFavorite, restaurants, updateList);
    handleRestaurantClick(
      event,
      restaurants,
      onToggleFavorite,
      onDeleteRestaurant
    );
  });

  return $element;
};

export default RestaurantList;
