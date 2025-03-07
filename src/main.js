import { restaurantsData } from "./restaurantsData";
import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "./constants/constants.js";
import { validateRestaurant } from "./validateRestaurant.js";
import { ERROR_MESSAGE } from "./constants/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

  const restaurantList = document.querySelector(".restaurant-list");

  const addRestaurantModalButton = header.querySelector(".gnb__button");
  const addNewRestaurantModal = document.getElementById(
    "add-restaurant-dialog"
  );
  const closeModalButton = document.getElementById("cancel-dialog-btn");
  const form = addNewRestaurantModal.querySelector("form");

  restaurantsData.forEach((restaurantData) => {
    const restaurantItem = createRestaurantItem(restaurantData);
    restaurantList.appendChild(restaurantItem);
  });

  addRestaurantModalButton.addEventListener("click", () => {
    addNewRestaurantModal.showModal();
  });

  addNewRestaurantModal.addEventListener("click", (event) => {
    if (!event.target.closest(".modal-container")) {
      addNewRestaurantModal.close();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const categoryInput = document.getElementById("category");
    const distanceInput = document.getElementById("distance");
    const linkInput = document.getElementById("link");

    const restaurantsNameList = restaurantsData.map((restaurant) => {
      return restaurant.name;
    });

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
    addNewRestaurantModal.close();
  });

  closeModalButton.addEventListener("click", () => {
    form.reset();
    addNewRestaurantModal.close();
  });
});

const createHeader = ({ title }) => {
  const header = document.createElement("header");
  header.innerHTML = `
      <h1 class="gnb__title text-title">${title}</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="public/images/add-button.png" alt="음식점 추가" />
      </button>`;
  header.classList.add("gnb");
  return header;
};

const createRestaurantItem = ({
  category,
  name,
  distance,
  description,
  imgSrc,
}) => {
  const li = document.createElement("li");
  li.classList.add("restaurant");

  const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category];

  li.innerHTML = `
    <div class="restaurant__category">
      <img src="${mappedImage}" alt="${category}" class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">${distance}</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
  `;
  return li;
};
