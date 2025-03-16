import EventHandler from "../utils/EventHandler.js";

function listItemOpenEventHandler(mainElement, DetailModalController) {
  mainElement.addEventListener("click", (event) => {
    if (event.target.closest(".favorite-star")) return;
    const restaurantElement = event.target.closest("li.restaurant");
    if (!restaurantElement) return;
    const restaurantName = restaurantElement.dataset.name;

    const modalElement = DetailModalController(restaurantName);

    mainElement.appendChild(modalElement);
    EventHandler.modalToggle(modalElement);
  });
}

export default listItemOpenEventHandler;
