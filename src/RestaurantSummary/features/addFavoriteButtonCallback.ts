import RestaurantSummary from "../RestaurantSummary";
import IMAGE from "../../IMAGE";

const addFavoriteButtonCallback = (summary: RestaurantSummary) => {
  summary.element.querySelector(".favorite-button")?.addEventListener("click", () => {
    summary.info.favorite = !summary.info.favorite;
    (summary.element.querySelector(".favorite-button img") as HTMLImageElement).src = (
      summary.info.favorite ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN
    );

    summary.element.dispatchEvent(
      new CustomEvent("favoriteChange", { bubbles: true })
    );
  });
};

export default addFavoriteButtonCallback;
