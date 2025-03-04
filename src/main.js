import { restaurantsData } from "./restaurantsData";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

  const restaurantListContainer = document.querySelector(
    ".restaurant-list-container"
  );
  const restaurantList = document.querySelector(".restaurant-list");

  const addRestaurantButton = header.querySelector(".gnb__button");
  const addNewRestaurantModal = document.querySelector("dialog");
  const closeModalButton = document.getElementById("cancel-dialog-btn");

  restaurantsData.forEach((restaurantData) => {
    const restaurantItem = createRestaurantItem(restaurantData);
    restaurantList.appendChild(restaurantItem);
  });

  addRestaurantButton.addEventListener("click", () => {
    addNewRestaurantModal.showModal();
  });

  addNewRestaurantModal.addEventListener("click", (event) => {
    if (event.target === addNewRestaurantModal) {
      addNewRestaurantModal.close();
    }
  });

  closeModalButton.addEventListener("click", () => {
    addNewRestaurantModal.close();
  });
});

const createHeader = ({ title }) => {
  const header = document.createElement("header");

  header.innerHTML = `
      <h1 class="gnb__title text-title">${title}</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="../images/add-button.png" alt="음식점 추가" />
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

  li.innerHTML = `
    <div class="restaurant__category">
      <img src="${imgSrc}" alt="${category}" class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">${distance}</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
  `;
  return li;
};
