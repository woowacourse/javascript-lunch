import createHeader from "./components/Header.ts";
import createTab from "./components/Tab.ts";
import createRestaurantItem from "./components/RestaurantItem.ts";
import { createModal } from "./components/Modal.ts";
import { createForm } from "./components/Form.ts";
import validateRestaurant from "./validateRestaurant.js";
import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "./constants/constants.js";
import { Category, Distance, Restaurant } from "./types/restaurant.ts";
import { restaurantManager } from "./restaurantManager.ts";

document.addEventListener("DOMContentLoaded", () => {
  const initialLoadRestaurantData = restaurantManager.getInitialData();

  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });

  const tab = createTab({
    title: "모든 음식점",
    subTitle: "자주 가는 음식점",
  });

  header?.after(tab);

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
      "restaurant-add-dialog"
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

    const restaurantsNameList = initialLoadRestaurantData.map(
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

    const errorMessage = validateRestaurant(newRestaurant, restaurantsNameList);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const restaurantItem = createRestaurantItem(newRestaurant);
    restaurantList?.appendChild(restaurantItem);

    restaurantManager.add(newRestaurant);

    formReset();
  };

  const formContent = createForm();
  const formReset = () => {
    const addRestaurantForm = document.querySelector<HTMLFormElement>(
      "#restaurant-add-dialog form"
    );
    addRestaurantForm?.reset();
  };

  const addRestaurantModal = createModal({
    id: "restaurant-add-dialog",
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

  const addRestaurantModalButton = header?.querySelector(".gnb__button");
  addRestaurantModalButton?.addEventListener("click", () => {
    addRestaurantModal.showModal();
  });

  const showRestaurantDetail = (restaurant: Restaurant) => {
    const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[restaurant.category];

    const isFavorite = restaurant.isFavorite;
    const isFavoriteIconSrc = isFavorite
      ? "images/favorite-icon-filled.png"
      : "images/favorite-icon-lined.png";

    const restaurantDetailContent = `
  <div class="detail-modal-content" data-id="${restaurant.id}">
    <div class="detail-modal-header">
      <img src="${isFavoriteIconSrc}" alt="즐겨찾기" class="favorite-icon" data-id="${
      restaurant.id
    }" data-favorite="${isFavorite}" />
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
      id: "restaurant-detail-dialog",
      content: restaurantDetailContent,
      options: {
        close: {
          label: "닫기",
          onClick: () => {
            detailModal.close();
          },
        },
        submit: {
          label: "삭제하기",
          onClick: () => {
            if (!restaurant?.id) {
              throw new Error("음식점 ID가 존재하지 않습니다.");
            }
            restaurantManager.delete(restaurant.id);
          },
        },
      },
    });
    body?.append(detailModal);
    detailModal.showModal();
  };

  initialLoadRestaurantData.forEach((restaurant: Restaurant) => {
    const restaurantItem = createRestaurantItem(restaurant);

    restaurantItem.addEventListener("click", (e) => {
      if (
        e.target instanceof HTMLImageElement &&
        e.target.classList.contains("favorite-icon")
      ) {
        return;
      }
      showRestaurantDetail(restaurant);
    });

    restaurantList?.appendChild(restaurantItem);
  });

  body?.addEventListener("click", (e) => {
    if (
      e.target instanceof HTMLImageElement &&
      e.target.classList.contains("favorite-icon")
    ) {
      const { id } = e.target.dataset;

      if (!id) {
        throw new Error("음식점 ID가 존재하지 않습니다.");
      }
      restaurantManager.toggleFavorite(id);
    }
  });
});
