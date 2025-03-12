import createHeader from "./components/Header.js";
import createRestaurantItem from "./components/RestaurantItem.js";
import { createModal } from "./components/Modal.js";
import { restaurantsData } from "./restaurantsData.js";
import validateRestaurant from "./validateRestaurant.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

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
