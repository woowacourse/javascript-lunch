import Modal from "../view/components/Modal/Modal";
import RestaurantDetailWithToggler from "../view/components/RestaurantInfo/RestaurantDetailWithToggler";
import RestaurantListProxy from "../domain/RestaurantListProxy";
import RestaurantPreviewWithToggler from "../view/components/RestaurantInfo/RestaurantPreviewWithToggler";
import SAMPLE_RESTAURANT from "../constants/sampleRestaurant";
import SubmitButton from "../view/components/SubmitButton/SubmitButton";

class RestaurantDetailModalController {
  #restaurantDetail = new RestaurantDetailWithToggler({
    restaurant: SAMPLE_RESTAURANT,
  });
  #restaurantDetailButtonDiv = this.#createRestaurantDetailButtonDiv();
  #afterDeleteFunc;

  modal;

  constructor(afterDeleteFunc: () => void) {
    this.#afterDeleteFunc = afterDeleteFunc;
    this.modal = new Modal({ closeFunc: afterDeleteFunc });
  }

  setRestaurantDetailWithToggler(
    previewWithToggler: RestaurantPreviewWithToggler
  ) {
    this.#restaurantDetail =
      this.#createRestaurantDetailWithToggler(previewWithToggler);
    this.modal.replaceContents(
      this.#restaurantDetail.element,
      this.#restaurantDetailButtonDiv
    );
  }
  openModal() {
    this.modal.open();
  }
  closeModal() {
    this.modal.close();
  }

  #createRestaurantDetailWithToggler(
    restaurantPreviewWithToggler: RestaurantPreviewWithToggler
  ) {
    const restaurant = restaurantPreviewWithToggler.restaurant;
    const isTogglerOn = restaurantPreviewWithToggler.favoriteToggler.isOn;
    const toggleOnFunc = () => {
      RestaurantListProxy.addToFavoriteRestaurantList(restaurant.name);
    };
    const toggleOffFunc = () => {
      RestaurantListProxy.deleteRestaurantInFavoriteRestaurantList(
        restaurant.name
      );
    };
    const afterToggleFunc = this.#afterDeleteFunc;
    const restaurantDetailWithToggler = new RestaurantDetailWithToggler({
      restaurant,
      isTogglerOn,
      toggleOnFunc,
      toggleOffFunc,
      afterToggleFunc,
    });

    return restaurantDetailWithToggler;
  }

  #createRestaurantDetailButtonDiv() {
    const div = document.createElement("div");

    const deleteButton = new SubmitButton({
      value: "삭제하기",
      color: "white",
      eventListenerArgs: [
        [
          "click",
          () => {
            this.closeModal.bind(this)();
            this.#deleteNowRestaurant.bind(this)();
            this.#afterDeleteFunc();
          },
        ],
      ],
    });

    const closeButton = new SubmitButton({
      value: "닫기",
      color: "orange",
      eventListenerArgs: [
        [
          "click",
          () => {
            this.closeModal.bind(this)();
          },
        ],
      ],
    });

    div.append(deleteButton.element, closeButton.element);

    div.classList.add("button-container");
    return div;
  }

  #deleteNowRestaurant() {
    const name = this.#restaurantDetail.restaurant.name;
    RestaurantListProxy.deleteRestaurantInEntireRestaurant(name);
  }
}

export default RestaurantDetailModalController;
