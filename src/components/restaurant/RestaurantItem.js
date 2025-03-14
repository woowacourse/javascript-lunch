import restaurantDataList from "../../domain/RestaurantDataList";
import createElement from "../../util/createElement";
import Modal from "../modal/Modal";
import RestaurantDetailModal from "../modal/restaurant-detail/RestaurantDetailModal";

export default function RestaurantItem({
  id,
  src,
  alt,
  name,
  distance,
  description,
  isFavorite,
}) {
  const $restaurantItem = createElement({
    tag: "li",
    classNames: ["restaurant"],
    id: id,
  });

  $restaurantItem.innerHTML = `
        <div class="restaurant__category">
            <img src=${src} alt=${alt} class="category-icon">
        </div>
          <div class="restaurant__info">
            <div class="restaurantItem__header">
              <div>
                  <h3 class="restaurant__name text-subtitle">${name}</h3>
                  <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              </div>
              <div>
              ${
                isFavorite
                  ? '<img name="favorite__star" class="favorite__star" src="/public/fill-star.png" alt="좋아요한 별" />'
                  : '<img name="favorite__star" class="favorite__star" src="/public/empty-star.png" alt="좋아요안한 별" />'
              }</div>
            </div>
       
            <p class="restaurant__description text-body">${description}</p>
        </div>`;

  $restaurantItem.addEventListener("click", (event) => {
    if (event.target.name === "favorite__star") {
      restaurantDataList.changeFavorite(id);
    } else {
      const dataById = restaurantDataList.getDataById(id);
      console.log(dataById);
      Modal(() => RestaurantDetailModal({ ...dataById }));
    }
  });

  return $restaurantItem;
}
