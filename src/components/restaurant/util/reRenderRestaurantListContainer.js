export default function reRenderRestaurantListContainer(parent, element) {
  removeRestaurantListContainer();
  parent.appendChild(element);
}

function removeRestaurantListContainer() {
  document.querySelector(".restaurant-list-container").remove();
}