import $form from "../form-elements/form.ts";
import $restaurantItem from "../restaurant/restaurant-item.ts";
import { currentRestaurantData } from "../../data/storage/restaurantStorage.ts";
import { CATEGORY_ICON } from "../../constants/iconPath.ts";
import { saveRestaurantsToLocalStorage } from "../../data/storage/restaurantStorage.ts";
import { Restaurant } from "../../data/models/restaurant.ts";

export type RestaurantProps = {
  category: string;
  name: string;
  distance: number;
  description: string;
  link: string;
  isFavorite: boolean;
};

type ModalProps = {
  form: HTMLElement | HTMLElement[];
};

export const addRestaurant = (data: RestaurantProps): void => {
  handleModalClose();
  const lastId =
    currentRestaurantData.length > 0
      ? Math.max(...currentRestaurantData.map((r) => r.dataId))
      : 0;
  const newId = lastId + 1;
  const categoryIcon = CATEGORY_ICON[data.category];
  const newRestaurant: Restaurant = {
    dataId: newId,
    categoryIcon,
    categoryTitle: data.category,
    name: data.name,
    distance: data.distance,
    distanceCaption: `캠퍼스부터 ${data.distance}분 내`,
    description: data.description,
    link: data.link,
    isFavorite: data.isFavorite,
  };

  currentRestaurantData.push(newRestaurant);
  saveRestaurantsToLocalStorage(currentRestaurantData);

  const restaurantList = document.querySelector(".restaurant-list");
  if (!restaurantList) return;
  restaurantList.appendChild($restaurantItem(newRestaurant));
  location.reload();
};

export const handleModalClose = (): void => {
  const modal = document.querySelector(".modal");
  if (!modal) return;
  modal.classList.remove("modal--open");
};

const handleModalOpen = (): void => {
  const modal = document.querySelector(".modal");
  if (!modal) return;
  modal.classList.add("modal--open");
};

const $addRestaurantModal = ({ form }: ModalProps): HTMLDivElement => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("modal");

  const background = document.createElement("div");
  background.classList.add("modal-backdrop");
  wrapper.appendChild(background);

  const container = document.createElement("div");
  container.classList.add("modal-container");

  const title = document.createElement("h2");
  title.classList.add("modal-title", "text-title");
  title.innerText = "새로운 음식점";
  container.appendChild(title);
  container.appendChild($form(form));
  wrapper.appendChild(container);

  document.addEventListener("keydown", (e) => {
    e.key === "Escape" && handleModalClose();
  });
  background.addEventListener("click", handleModalClose);

  const headerButton = document.querySelector(".gnb__button");
  if (!headerButton) throw new Error("헤더에서 버튼을 찾을 수 없습니다.");
  headerButton.addEventListener("click", handleModalOpen);

  return wrapper;
};

export default $addRestaurantModal;
