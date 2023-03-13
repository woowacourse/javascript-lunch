import RestaurantSummary from "../RestaurantSummary";

const addOpenDetailedCallback = (restaurantSummary: RestaurantSummary) => {
  restaurantSummary.element.querySelector(".restaurant__info")?.addEventListener("click", () => {
    restaurantSummary.element.dispatchEvent(
      new CustomEvent("openDetailed", { bubbles: true, detail: { info: restaurantSummary.info }})
    );
  });
}

export default addOpenDetailedCallback;
