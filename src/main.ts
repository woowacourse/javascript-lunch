import createHeader from "./components/Header.ts";
import createTab from "./components/Tab.ts";
import createRestaurantItem from "./components/RestaurantItem.ts";
import { createModal } from "./components/Modal.ts";
import { createForm } from "./components/Form.ts";
import validateRestaurant from "./validateRestaurant.js";
import { restaurantsData } from "./restaurantsData.ts";
import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "./constants/constants.js";
import { Category, Restaurant } from "./types/restaurant.ts";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body?.prepend(header);

  const tab = createTab({
    title: "모든 음식점",
    subTitle: "자주 가는 음식점",
  });
  header.after(tab);

  const mainTab = tab.querySelector(".tab__title");
  const subTab = tab.querySelector(".tab__subTitle");
  const restaurantFilterContainer = document.querySelector(
    ".restaurant-filter-container"
  );

  mainTab?.classList.add("active");

  mainTab?.addEventListener("click", () => {
    mainTab.classList.add("active");
    subTab?.classList.remove("active");
    // TODO '모든 음식점' 목록을 렌더링
    restaurantFilterContainer?.classList.remove("hidden");
  });

  subTab?.addEventListener("click", () => {
    subTab.classList.add("active");
    mainTab?.classList.remove("active");
    // TODO '자주 가는 음식점' 목록을 렌더링
    restaurantFilterContainer?.classList.add("hidden");
  });

  const restaurantList = document.querySelector(".restaurant-list");

  const handleFormSubmit = () => {
    const addRestaurantDialogElement = document.getElementById(
      "add-restaurant-dialog"
    );

    if (!addRestaurantDialogElement) {
      throw new Error("다이얼로그 요소를 찾을 수 없습니다.");
    }

    const nameInput =
      addRestaurantDialogElement.querySelector<HTMLInputElement>("#name");
    const descriptionInput =
      addRestaurantDialogElement.querySelector<HTMLTextAreaElement>(
        "#description"
      );
    const categoryInput =
      addRestaurantDialogElement.querySelector<HTMLSelectElement>("#category");
    const distanceInput =
      addRestaurantDialogElement.querySelector<HTMLSelectElement>("#distance");
    const linkInput =
      addRestaurantDialogElement.querySelector<HTMLInputElement>("#link");

    const restaurantsNameList = restaurantsData.map(
      (restaurant) => restaurant.name
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
      category: categoryInput.value as Category,
      name: nameInput.value,
      distance: Number(distanceInput.value),
      description: descriptionInput.value,
      link: linkInput.value,
    };

    const errorMessage = validateRestaurant(newRestaurant, restaurantsNameList);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const restaurantItem = createRestaurantItem(newRestaurant);
    restaurantList?.appendChild(restaurantItem);

    formReset();
  };

  const formContent = createForm();
  const formReset = () => {
    const addRestaurantForm = document.querySelector<HTMLFormElement>(
      "#add-restaurant-dialog form"
    );
    addRestaurantForm?.reset();
  };

  const addRestaurantModal = createModal({
    id: "add-restaurant-dialog",
    title: "새로운 음식점",
    content: formContent,
    options: {
      close: {
        label: "취소하기",
        onClick: () => {
          formReset();
        },
      },
      submit: {
        label: "추가하기",
        onClick: handleFormSubmit,
      },
    },
  });

  body?.append(addRestaurantModal);

  const addRestaurantModalButton = header.querySelector(".gnb__button");
  addRestaurantModalButton?.addEventListener("click", () => {
    addRestaurantModal.showModal();
  });

  const showRestaurantDetail = (restaurant: Restaurant) => {
    const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[restaurant.category];
    const restaurantDetailContent = `
  <div class="detail-modal-content">
    <div class="detail-modal-header">
      <img src="images/favorite-icon-lined.png" alt="즐겨찾기" class="favorite-icon" />
      <div class="detail-modal-category">
        <img src="${mappedImage}" alt="${restaurant.category}" />
      </div>
      <div class="detail-modal-info">
        <h3 class="detail-modal-title">${restaurant.name}</h3>
        <span class="detail-modal-distance">캠퍼스로부터 ${
          restaurant.distance
        }분 내</span>
      </div>
    </div>
    <p class="detail-modal-description">${restaurant.description ?? ""}</p>
    ${
      restaurant.link
        ? `<p class="detail-modal-link">
            <a href="${restaurant.link}" target="_blank">${restaurant.link}</a>
           </p>`
        : ""
    }
  </div>
`;

    const detailModal = createModal({
      isForm: false,
      content: restaurantDetailContent,
    });
    body?.append(detailModal);
    detailModal.showModal();
  };

  restaurantsData.forEach((restaurant) => {
    const restaurantItem = createRestaurantItem(restaurant);

    restaurantItem.addEventListener("click", () => {
      showRestaurantDetail(restaurant);
    });

    restaurantList?.appendChild(restaurantItem);
  });
});
