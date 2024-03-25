import EntireRestaurantPreviewController from "./EntireRestaurantPreviewController";
import FavoriteRestaurantPreviewController from "./FavoriteRestaurantPreviewController";
import RestaurantDetailModalController from "./RestaurantDetailModalController";
import RestaurantFormModalController from "./RestaurantFormModalController";
import RestaurantListProxy from "../domain/RestaurantListProxy";
import RestaurantPreviewWithToggler from "../view/components/RestaurantInfo/RestaurantPreviewWithToggler";
import TabBar from "../view/components/TabBar/TabBar";

class MainController {
  element = document.createElement("main");

  #tabBar;
  #detailModalController;
  #formModalController;
  #entireRestaurantPreview;
  #favoriteRestaurantPreview;

  constructor() {
    RestaurantListProxy.init();

    this.#entireRestaurantPreview = new EntireRestaurantPreviewController(
      this.#previewClickEvent.bind(this)
    );
    this.#favoriteRestaurantPreview = new FavoriteRestaurantPreviewController(
      this.#previewClickEvent.bind(this)
    );

    this.#tabBar = this.#createTabBar();

    this.#detailModalController = new RestaurantDetailModalController(() => {
      this.#entireRestaurantPreview.render.bind(
        this.#entireRestaurantPreview
      )();
      this.#favoriteRestaurantPreview.render.bind(
        this.#favoriteRestaurantPreview
      )();
    });

    this.#formModalController = new RestaurantFormModalController(() =>
      this.#tabBar.selectTabBarItem(0)
    );

    this.#render();
  }

  #render() {
    this.element.append(
      this.#tabBar.element,
      this.#entireRestaurantPreview.element,
      this.#favoriteRestaurantPreview.element,
      this.#detailModalController.modal.element,
      this.#formModalController.modal.element
    );
  }

  #previewClickEvent(previewWithToggler: RestaurantPreviewWithToggler) {
    this.#detailModalController.setRestaurantDetailWithToggler(
      previewWithToggler
    );
    this.#detailModalController.openModal();
  }

  #createTabBar() {
    return new TabBar([
      {
        value: "모든 음식점",
        onFunction: () => {
          this.#entireRestaurantPreview.render.bind(
            this.#entireRestaurantPreview
          )();
          this.#entireRestaurantPreview.reveal.bind(
            this.#entireRestaurantPreview
          )();
        },
        offFunction: () => {
          this.#entireRestaurantPreview.hide.bind(
            this.#entireRestaurantPreview
          )();
        },
      },
      {
        value: "자주 가는 음식점",
        onFunction: () => {
          this.#favoriteRestaurantPreview.render.bind(
            this.#favoriteRestaurantPreview
          )();
          this.#favoriteRestaurantPreview.reveal.bind(
            this.#favoriteRestaurantPreview
          )();
        },
        offFunction: () => {
          this.#favoriteRestaurantPreview.hide.bind(
            this.#favoriteRestaurantPreview
          )();
        },
      },
    ]);
  }

  attachEventToHeader(
    titleElement: HTMLElement,
    addButtonElement: HTMLButtonElement
  ) {
    titleElement.addEventListener("click", () => {
      this.#tabBar.selectTabBarItem(0);
    });

    addButtonElement?.addEventListener("click", () => {
      this.#formModalController.openModal();
    });
  }
}

export default MainController;
