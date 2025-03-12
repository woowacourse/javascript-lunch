import $form from "../form-elements/form.ts";
import $restaurantItem from "../restaurant/restaurant-item.ts";
import { CATEGORY_ICON } from "../../constants/iconPath.ts";

export type RestaurantProps = {
  category: string;
  name: string;
  distance: number;
  description: string;
};

type ModalProps = {
  form: HTMLElement | HTMLElement[];
};

export const addRestaurant = (data: RestaurantProps): void => {
  handleModalClose();
  const categoryIcon = CATEGORY_ICON[data.category];
  const newRestaurant = {
    categoryIcon,
    categoryTitle: data.category,
    name: data.name,
    distance: data.distance,
    distanceCaption: `캠퍼스부터 ${data.distance}분 내`,
    description: data.description,
  };
  const restaurantList = document.querySelector(".restaurant-list");
  if (!restaurantList) return;
  restaurantList.appendChild($restaurantItem(newRestaurant));
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

const $modal = ({ form }: ModalProps): HTMLDivElement => {
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

export default $modal;
