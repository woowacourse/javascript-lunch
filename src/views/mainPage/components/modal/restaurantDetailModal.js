import { $ } from "../../../../utils/domHelpers";
import koreanIcon from "/category-korean.png";
import chineseIcon from "/category-chinese.png";
import japaneseIcon from "/category-japanese.png";
import westernIcon from "/category-western.png";
import asianIcon from "/category-asian.png";
import etcIcon from "/category-etc.png";
import favoriteIconFilled from "/favorite-icon-filled.png";
import favoriteIconLined from "/favorite-icon-lined.png";
import text from "../../../../components/@common/text";
import { StorageController } from "../../../../utils/storage";

const categoryIcons = {
  korean: koreanIcon,
  chinese: chineseIcon,
  japanese: japaneseIcon,
  western: westernIcon,
  asian: asianIcon,
  etc: etcIcon,
};

const categoryAlt = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시아식",
  etc: "기타",
};

const restaurantStorage = new StorageController("restaurants");

const restaurantDetailModal = (restaurantData) => {
  const $modalContainer = $(".modal-container");
  $modalContainer.innerHTML = `
    <form>
      <div class="detail-header">
        <div class="restaurant__category">
            <img
              src="${categoryIcons[restaurantData.category]}"
              alt="${categoryAlt[restaurantData.category]}"
              class="category-icon"
            />
        </div>
        <div class="detail-favorite-icon">
          <img
            src="${
              restaurantData.isFavorite ? favoriteIconFilled : favoriteIconLined
            }"
            alt="favorite icon"
          />
        </div>
      </div>
      <h2 class="detail-text text-title">${restaurantData.title}</h2>
      <div class="restaurant__info">
        ${text({
          tag: "span",
          size: "medium",
          color: "orange",
          children: `캠퍼스부터 ${restaurantData.distance}분 내`,
        })}
        <p class="detail-text text-body">
          ${restaurantData.description}
        </p>
        <a class="text-body" href=${restaurantData.link}>
          ${restaurantData.link}
        </a>
      </div>
      <div class="detail-footer">
        <button type="button" class="button button--delete" data-delete-target="${
          restaurantData.id
        }">삭제하기</button>
        <button type="button" class="button button--close">닫기</button>
      </div>
    </form>
  `;

  const $detailFavoriteIcon = $(".detail-favorite-icon img");
  $detailFavoriteIcon.addEventListener("click", () => {
    restaurantData.isFavorite = !restaurantData.isFavorite;
    $detailFavoriteIcon.src = restaurantData.isFavorite
      ? favoriteIconFilled
      : favoriteIconLined;

    const restaurants = restaurantStorage.getStorage();
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === restaurantData.id ? restaurantData : restaurant
    );
    restaurantStorage.setStorage(updatedRestaurants);

    const li = document.querySelector(`[data-id="${restaurantData.id}"]`);
    const $iconInList = li.querySelector(".favorite-icon");

    $iconInList.src = $detailFavoriteIcon.src;
  });
};

export default restaurantDetailModal;
