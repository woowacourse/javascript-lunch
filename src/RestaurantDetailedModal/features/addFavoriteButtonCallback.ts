import RestaurantDetailedModal from "../RestaurantDetailedModal";
import IMAGE from "../../IMAGE";

const addFavoriteButtonCallback = (modal: RestaurantDetailedModal) => {
  modal.element.querySelector(".favorite-button")?.addEventListener("click", () => {
    modal.info.favorite = !modal.info.favorite;
    (modal.element.querySelector(".favorite-button img") as HTMLImageElement).src = (
      modal.info.favorite ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN
    );

    modal.element.dispatchEvent(
      new CustomEvent("favoriteChange", { bubbles: true, detail: { info: modal.info, from: "detailed"} })
    );
  });
};

export default addFavoriteButtonCallback;
