import { GetAllRestaurants } from "../domain/RestaurantStorage";

export default function RestaurantDetailModal() {
  const $app = document.getElementById("app");
  const $restaurant = document.querySelectorAll(".restaurant");

  $restaurant.forEach((restaurant) => {
    restaurant.addEventListener("click", (e) => {
      const $restaurant = e.target.closest(".restaurant");

      const restaurants = GetAllRestaurants();
      const restaurantName =
        $restaurant.querySelector(".restaurant__name").textContent;

      const restaurantValues = restaurants.find(
        (restaurant) => restaurant.nameValue === restaurantName
      );

      console.log("테스트@@@@", restaurantValues);

      DetailModal($app, restaurantValues);
    });
  });
}

function DetailModal(container, inputValue) {
  container.innerHTML += `
    <div class="restaurant-detail-modal-background">
        <div class="restaurant-detail-modal">
            <div>
                <img src="./category-${inputValue.category}.png" alt="${
    inputValue.categoryValue
  }" class="category-icon"/>
                <img class="restaurant-favorite-star" src=${
                  inputValue.favorite === false
                    ? "/favorite-icon-lined.png"
                    : "/favorite-icon-filled.png"
                } alt="favorite star"/>
            </div>
            <div>
                <h3 class="restaurant__name text-subtitle">${
                  inputValue.nameValue
                }</h3>
                <span class="restaurant__distance text-body">
            캠퍼스부터 ${inputValue.distanceValue}분 내
            </span>
                <p class="restaurant__description text-body">${
                  inputValue.descriptionValue
                }</p>
                <a href="${inputValue.link}">${inputValue.link}</a>
            </div>
            <div>
                <button>삭제하기</button>
                <button>닫기</button>
            </div>
        </div>
    </div>
    `;
}
