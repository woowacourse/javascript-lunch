import { restaurantsData } from "./restaurantsData";

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
    if (nameInput.value.length > 20) {
      alert("이름은 최대 20글자까지 가능합니다.");
      return;
    }

    const restaurantsNameList = restaurantsData.map((restaurant) => {
      return restaurant.name;
    });

    if (restaurantsNameList.includes(nameInput.value)) {
      alert("기존에 있는 식당과 중복된 이름입니다.");
      return;
    }

    const descriptionInput = document.getElementById("description");
    if (descriptionInput.value.length > 500) {
      alert("설명은 최대 500글자까지 가능합니다.");
      return;
    }

    // TODO
    const newRestaurant = {
      category: document.getElementById("category").value,
      name: nameInput.value,
      distance: document.getElementById("distance").value + "분 내",
      description: descriptionInput.value,
      link: document.getElementById("link").value,
    };

    // TODO 메시지를 상수로 빼두자
    // constants 폴더에

    const restaurantItem = createRestaurantItem(newRestaurant);
    restaurantList.appendChild(restaurantItem);

    form.reset();
    addNewRestaurantModal.close();
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

  // TODO 얘도 상수
  const imageSrcByRestaurantsCategory = {
    한식: "./images/category-korean.png",
    중식: "./images/category-chinese.png",
    일식: "./images/category-japanese.png",
    양식: "./images/category-western.png",
    아시안: "./images/category-asian.png",
    기타: "./images/category-etc.png",
  };

  const mappedImage = imageSrcByRestaurantsCategory[category];

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
