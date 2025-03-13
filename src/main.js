import createHeader from "./components/Header.js";
import createTab from "./components/Tab.js";
import createRestaurantItem from "./components/RestaurantItem.js";
import { createModal } from "./components/Modal.js";
import validateRestaurant from "./validateRestaurant.js";
import { restaurantsData } from "./restaurantsData.js";

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
  restaurantsData.forEach((data) => {
    const restaurantItem = createRestaurantItem(data);
    restaurantList.appendChild(restaurantItem);
  });

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

  const modal = createModal({
    title: "새로운 음식점",
    onSubmit: handleFormSubmit,
  });
  body.append(modal);

  const addRestaurantModalButton = header.querySelector(".gnb__button");
  addRestaurantModalButton.addEventListener("click", () => {
    modal.showModal();
  });
});
