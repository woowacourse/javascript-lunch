import createHeader from "./components/Header.js";
import createTab from "./components/Tab.js";
import createRestaurantItem from "./components/RestaurantItem.js";
import { createModal } from "./components/Modal.js";
import validateRestaurant from "./validateRestaurant.js";
import { restaurantsData } from "./restaurantsData.js";
import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "./constants/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

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

  mainTab.classList.add("active");

  mainTab.addEventListener("click", () => {
    mainTab.classList.add("active");
    subTab.classList.remove("active");
    // TODO '모든 음식점' 목록을 렌더링
    restaurantFilterContainer.classList.remove("hidden");
  });

  subTab.addEventListener("click", () => {
    subTab.classList.add("active");
    mainTab.classList.remove("active");
    // TODO '자주 가는 음식점' 목록을 렌더링
    restaurantFilterContainer.classList.add("hidden");
  });

  const restaurantList = document.querySelector(".restaurant-list");

  const handleFormSubmit = (form, modal) => {
    const nameInput = form.querySelector("#name");
    const descriptionInput = form.querySelector("#description");
    const categoryInput = form.querySelector("#category");
    const distanceInput = form.querySelector("#distance");
    const linkInput = form.querySelector("#link");

    const restaurantsNameList = restaurantsData.map(
      (restaurant) => restaurant.name
    );

    const newRestaurant = {
      category: categoryInput.value,
      name: nameInput.value,
      distance: `${distanceInput.value}분 내`,
      description: descriptionInput.value,
      link: linkInput.value,
    };

    const errorMessage = validateRestaurant(newRestaurant, restaurantsNameList);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const restaurantItem = createRestaurantItem(newRestaurant);
    restaurantList.appendChild(restaurantItem);

    form.reset();
    modal.close();
  };

  const addRestaurantModal = createModal({
    title: "새로운 음식점",
    isForm: true,
    onSubmit: handleFormSubmit,
  });
  body.append(addRestaurantModal);

  const addRestaurantModalButton = header.querySelector(".gnb__button");
  addRestaurantModalButton.addEventListener("click", () => {
    addRestaurantModal.showModal();
  });

  const showRestaurantDetail = (restaurant) => {
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
        <span class="detail-modal-distance">${restaurant.distance}</span>
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
    body.append(detailModal);
    detailModal.showModal();
  };

  restaurantsData.forEach((restaurant) => {
    const restaurantItem = createRestaurantItem(restaurant);

    restaurantItem.addEventListener("click", () => {
      showRestaurantDetail(restaurant);
    });

    restaurantList.appendChild(restaurantItem);
  });
});
