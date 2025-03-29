import Modal from "./Modal.ts";
import RestaurantForm from "./RestaurantForm.ts";
import validateRestaurant from "../validateRestaurant.js";
import { Restaurant, Category, Distance } from "../types/restaurant.ts";
import { restaurantManager } from "../restaurantManager.ts";
import { $ } from "../utils/dom.ts";

const MODAL_ID = "restaurant-add-dialog";

type RestaurantAddModalProps = {
  restaurants: Restaurant[];
  onAddRestaurant: (updatedRestaurants: Restaurant[]) => void;
};

const RestaurantAddModal = ({
  restaurants,
  onAddRestaurant,
}: RestaurantAddModalProps) => {
  const $existingModal = $(`#${MODAL_ID}`);
  if ($existingModal) {
    $existingModal.remove();
  }

  const resetForm = ($form: HTMLFormElement | null) => {
    if (!$form) {
      return;
    }
    $form.reset();
  };

  const submitForm = ($modal: HTMLDialogElement) => {
    const nameInput = $modal.querySelector<HTMLInputElement>("#name");
    const descriptionInput =
      $modal.querySelector<HTMLTextAreaElement>("#description");
    const categoryInput = $modal.querySelector<HTMLSelectElement>("#category");
    const distanceInput = $modal.querySelector<HTMLSelectElement>("#distance");
    const linkInput = $modal.querySelector<HTMLInputElement>("#link");

    const restaurantsNameList = restaurants.map(
      (restaurant: Restaurant) => restaurant.name
    );

    if (
      !nameInput ||
      !descriptionInput ||
      !categoryInput ||
      !distanceInput ||
      !linkInput
    ) {
      throw new Error("필요한 입력 요소 중 하나 이상을 찾을 수 없습니다.");
    }

    const newRestaurant = {
      id: restaurantManager.getUniqueId(),
      category: categoryInput.value as Category,
      name: nameInput.value,
      distance: Number(distanceInput.value) as Distance,
      description: descriptionInput.value,
      link: linkInput.value,
      isFavorite: false,
    };

    try {
      const errorMessage = validateRestaurant(
        newRestaurant,
        restaurantsNameList
      );

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const updatedRestaurants = [...restaurants, newRestaurant];
      restaurantManager.add(newRestaurant);
      onAddRestaurant(updatedRestaurants);

      const $form = $modal.querySelector<HTMLFormElement>("form");
      resetForm($form);
      $modal.close();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const $modal = Modal({
    id: MODAL_ID,
    title: "새로운 음식점",
    content: RestaurantForm(),
    options: {
      close: {
        label: "취소하기",
        onClick: () => {
          const $form = $modal.querySelector<HTMLFormElement>("form");
          resetForm($form);
        },
      },
      submit: {
        label: "추가하기",
        onClick: () => {
          submitForm($modal);
        },
      },
    },
  });

  $modal.addEventListener("close", () => {
    const $form = $modal.querySelector<HTMLFormElement>("form");
    resetForm($form);
  });

  const body = $("body");
  if (body) {
    body.append($modal);
    $modal.showModal();
  }

  return $modal;
};

export default RestaurantAddModal;
