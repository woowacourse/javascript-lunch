import Modal from "./Modal.ts";
import { Restaurant } from "../types/restaurant.ts";
import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../constants/constants.ts";
import { $ } from "../utils/dom.ts";

const RestaurantDetailModal = (
  restaurant: Restaurant,
  onDelete: (id: string) => void,
  onFavorite: (id: string, isFavorite: boolean) => void
) => {
  if (!restaurant.id) return;

  const $existingModal = $("#restaurant-detail-dialog");
  if ($existingModal) {
    $existingModal.remove();
  }

  const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[restaurant.category];

  const createDetailContent = (currentRestaurant: Restaurant) => {
    const isFavorite = currentRestaurant.isFavorite;
    const isFavoriteIconSrc = isFavorite
      ? "images/favorite-icon-filled.png"
      : "images/favorite-icon-lined.png";

    return `
      <div class="detail-modal-content" data-id="${currentRestaurant.id}">
        <div class="detail-modal-header">
          <img src="${isFavoriteIconSrc}" alt="즐겨찾기" class="favorite-icon" data-id="${
      currentRestaurant.id
    }" data-favorite="${isFavorite}" />
          <div class="detail-modal-category">
            <img src="${mappedImage}" alt="${currentRestaurant.category}" />
          </div>
          <div class="detail-modal-info">
            <h3 class="detail-modal-title">${currentRestaurant.name}</h3>
            <span class="detail-modal-distance">캠퍼스로부터 ${
              currentRestaurant.distance
            }분 내</span>
          </div>
        </div>
        <p class="detail-modal-description">${
          currentRestaurant.description ?? ""
        }</p>
        ${
          currentRestaurant.link
            ? `<p class="detail-modal-link">
                <a href="${currentRestaurant.link}" target="_blank">${currentRestaurant.link}</a>
              </p>`
            : ""
        }
      </div>
    `;
  };

  const restaurantDetailContent = createDetailContent(restaurant);

  const $detailModal = Modal({
    id: "restaurant-detail-dialog",
    content: restaurantDetailContent,
    options: {
      close: {
        label: "닫기",
        onClick: () => $detailModal.close(),
      },
      submit: {
        label: "삭제하기",
        onClick: () => {
          if (!restaurant.id) return;
          onDelete(restaurant.id);
          $detailModal.close();
        },
      },
    },
  });

  const setupFavoriteIcon = () => {
    const modalFavoriteIcon = $detailModal.querySelector(".favorite-icon");
    if (modalFavoriteIcon instanceof HTMLImageElement) {
      modalFavoriteIcon.addEventListener("click", (e: Event) => {
        e.stopPropagation();

        if (!restaurant.id) return;

        const isFavorite = modalFavoriteIcon.dataset.favorite === "true";
        const toggledIsFavorite = !isFavorite;

        modalFavoriteIcon.src = toggledIsFavorite
          ? "images/favorite-icon-filled.png"
          : "images/favorite-icon-lined.png";
        modalFavoriteIcon.dataset.favorite = String(toggledIsFavorite);

        onFavorite(restaurant.id, toggledIsFavorite);
      });
    }
  };

  const body = $("body");
  if (body) {
    body.append($detailModal);
    setupFavoriteIcon();
    $detailModal.showModal();
  }
};

export default RestaurantDetailModal;
