import createRestaurantItem from "./RestaurantItem.ts";
import Modal from "./Modal.ts";
import { Restaurant } from "../types/restaurant.ts";
import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../constants/constants.ts";
import { restaurantManager } from "../restaurantManager.ts";

export const renderRestaurantList = (
  restaurants: Restaurant[],
  setRestaurant: (restaurants: Restaurant[]) => void,
  el?: Element
) => {
  let localRestaurants: Restaurant[] = restaurants;

  const handleFavorite = (id?: string) => {
    const updatedRestaurants = localRestaurants.map((restaurant) =>
      restaurant.id === id
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    restaurantManager.toggleFavorite(id);
    setRestaurant(updatedRestaurants);
    localRestaurants = updatedRestaurants;
    render(localRestaurants);
  };

  const handleDelete = (id: string) => {
    const updatedRestaurants = localRestaurants.filter(
      (restaurant) => restaurant.id !== id
    );
    restaurantManager.delete(id);
    setRestaurant(updatedRestaurants);
    localRestaurants = updatedRestaurants;
    render(localRestaurants);
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
          handleFavorite(restaurant.id);
          return;
        }
        showRestaurantDetail(restaurant, handleDelete, handleFavorite);
      });

      el?.appendChild(restaurantItem);
    });
  };

  render(localRestaurants);
};

const showRestaurantDetail = (
  restaurant: Restaurant,
  onDelete: (id: string) => void,
  onFavorite: (id?: string) => void
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

  const detailModal = Modal.create({
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

  const modalFavoriteIcon = detailModal.querySelector(".favorite-icon");
  if (modalFavoriteIcon instanceof HTMLImageElement) {
    modalFavoriteIcon.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLImageElement;
      const currentFavorite = target.dataset.favorite === "true";
      const toggledFavorite = !currentFavorite;
      const newSrc = toggledFavorite
        ? "images/favorite-icon-filled.png"
        : "images/favorite-icon-lined.png";

      target.setAttribute("src", newSrc);
      target.dataset.favorite = String(toggledFavorite);

      onFavorite(restaurant.id);
    });
  }
};

export default renderRestaurantList;
