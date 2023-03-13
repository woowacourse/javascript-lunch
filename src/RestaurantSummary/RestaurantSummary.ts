import PersonalRestaurant from "../type/PersonalRestaurant";
import IMAGE from "../IMAGE";
import createSummaryElement from "./UI/createSummaryElement";
import addOpenDetailedCallback from "./features/addOpenDetailedCallback";
import addFavoriteButtonCallback from "./features/addFavoriteButtonCallback";

class RestaurantSummary {
  public readonly info: PersonalRestaurant;
  public readonly element: HTMLElement;

  constructor(personalRestaurant: PersonalRestaurant) {
    this.info = personalRestaurant;
    this.element = createSummaryElement(personalRestaurant);
  
    addOpenDetailedCallback(this);
    addFavoriteButtonCallback(this);
  }

  favoriteChangeCallback(event: CustomEvent) {
    if (event.detail.info.restaurant === this.info.restaurant && event.detail.from === "detailed") {
      (this.element.querySelector(".favorite-button img") as HTMLImageElement).src = (
        this.info.favorite ? IMAGE.FILLED_STAR_BTN : IMAGE.EMPTY_STAR_BTN
      );
    }
  }
}

export default RestaurantSummary;
