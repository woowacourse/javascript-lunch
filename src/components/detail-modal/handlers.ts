const detailModalOpenHandler = (restaurant: Element) => {
  const modal = document.getElementsByClassName("detail-modal")[0];

  restaurant.addEventListener("click", () => {
    modal.classList.add("modal--open");
  });
};

export const clickRestaurantModal = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const restaurants = document.querySelectorAll(".restaurant");
    restaurants.forEach((restaurant) => {
      detailModalOpenHandler(restaurant);
    });
  });
};

export const dimmerClickHandler = () => {
  const modal = document.getElementsByClassName("detail-modal")[0];
  const dimmer = document.getElementsByClassName("detail-modal-dackdrop")[0];

  dimmer.addEventListener("click", () => {
    modal.classList.remove("modal--open");
  });
};
