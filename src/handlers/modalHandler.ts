import AddRestaurantModal from "../components/AddRestaurantModal.js";
import { Restaurant } from "../../types/Restaurant.ts";

export function setupAddRestaurantModal($container: HTMLElement): void {
  const modal = AddRestaurantModal();
  modal.render($container);
}