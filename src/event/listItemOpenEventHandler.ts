import EventHandler from "../utils/EventHandler.ts";

function listItemOpenEventHandler(
  mainElement: HTMLElement,
  DetailModalController: (restaurantName: string) => HTMLElement,
) {
  mainElement.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest(".favorite-star")) return;

    const restaurantElement = target.closest("li.restaurant") as HTMLLIElement | null;
    if (!restaurantElement) return;

    const restaurantName = restaurantElement.dataset.name || "";

    const modalElement = DetailModalController(restaurantName);

    mainElement.appendChild(modalElement);
    EventHandler.modalToggle(modalElement);
  });
}

export default listItemOpenEventHandler;
