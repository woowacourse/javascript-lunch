import { v4 as uuidv4 } from "uuid";
import { $ } from "../utils/domHelpers";
import { renderRestaurantList } from "../views/mainPage/components/display/restaurantList";
import { ERROR } from "../constants/messages";
import { escapeHtml } from "../utils/escapeHtml";
import { StorageController } from "../utils/storage";
import { Restaurant } from "../types/type";

const restaurantStorage = new StorageController<Restaurant[]>("restaurants");

const buttonHandler = (event: Event) => {
  event.preventDefault();

  const $form = (event.target as HTMLElement).closest(
    "form"
  ) as HTMLFormElement;
  const $category = $("#category") as HTMLSelectElement;
  const $name = $("#name") as HTMLInputElement;
  const $distance = $("#distance") as HTMLSelectElement;
  const $description = $("#description") as HTMLTextAreaElement;
  const $link = $("#link") as HTMLInputElement;

  const newRestaurant: Restaurant = {
    id: uuidv4(),
    category: escapeHtml($category.value) as Restaurant["category"],
    title: escapeHtml($name.value),
    distance: Number(escapeHtml($distance.value)) as Restaurant["distance"],
    description: escapeHtml($description.value),
    link: escapeHtml($link.value),
    isFavorite: false,
  };

  if (
    !newRestaurant.category ||
    !newRestaurant.title ||
    !newRestaurant.distance
  ) {
    alert(ERROR.INVALID_INPUT_REQUIRED);
    return;
  }

  const restaurants = restaurantStorage.getStorage() ?? [];
  restaurantStorage.setStorage([...restaurants, newRestaurant]);

  const $restaurantModal = $("#restaurant-modal");
  $restaurantModal.classList.remove("modal--open");
  document.body.style.overflow = "auto";

  $form.reset();

  renderRestaurantList([...restaurants, newRestaurant]);

  const $allRestaurantTab = $(".all-restaurant-tab");
  const $favoriteRestaurantTab = $(".favorite-restaurant-tab");

  if ($favoriteRestaurantTab.classList.contains("select-tab-button")) {
    $favoriteRestaurantTab.classList.remove("select-tab-button");
    $allRestaurantTab.classList.add("select-tab-button");
  }
};

export default buttonHandler;
