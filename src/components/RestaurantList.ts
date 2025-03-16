import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../constants/constants";
import { Restaurant } from "../types/restaurant.ts";
import { createModal } from "./Modal.ts";
import { restaurantManager } from "../restaurantManager.ts";
import createRestaurantItem from "./RestaurantItem.ts";

export const renderRestaurantList = (
  restaurants: Restaurant[],
  setRestaurant: (restaurants: Restaurant[]) => void,
  el?: Element
) => {
  const onDelete = (id: string) => {
    const updatedRestaurants = restaurants.filter((restaurant) => {
      return restaurant.id !== id;
    });

    restaurantManager.delete(id);
    setRestaurant(updatedRestaurants);
    render(updatedRestaurants);
  };

  const render = (restaurants: Restaurant[]) => {
    if (el) {
      el.innerHTML = "";
    }

    restaurants.forEach((restaurant: Restaurant) => {
      const restaurantItem = createRestaurantItem(restaurant);

      restaurantItem.addEventListener("click", (e) => {
        if (
          e.target instanceof HTMLImageElement &&
          e.target.classList.contains("favorite-icon")
        ) {
          return;
        }
        showRestaurantDetail(restaurant, onDelete);
      });

      el?.appendChild(restaurantItem);
    });
  };

  render(restaurants);
};

const showRestaurantDetail = (
  restaurant: Restaurant,
  onDelete: (id: string) => void
) => {
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
          onDelete(restaurant.id);
        },
      },
    },
  });
  document.body?.append(detailModal);
  detailModal.showModal();
};

export default renderRestaurantList;
