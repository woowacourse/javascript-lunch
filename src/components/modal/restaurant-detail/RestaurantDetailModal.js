import createElement from "../../../util/createElement";

export default function RestaurantDetailModal({
  id,
  src,
  alt,
  distance,
  description,
  link,
  name,
  isFavorite,
}) {
  console.log(link);
  const $section = createElement({
    tag: "section",
    classNames: ["restaurantDetail__modal"],
  });

  $section.innerHTML = /*html*/ `
        <div class="restaurantDetail__info">
          <div class="restaurant__category">
              <img src=${src} alt=${alt} class="category-icon">
          </div>
          <h3 class="restaurant__name text-subtitle marginTopBottom-15">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <div class="restaurantDetail__start">
            ${
              isFavorite
                ? '<img name="favorite__star" class="favorite__star" src="/public/fill-star.png" alt="좋아요한 별" />'
                : '<img name="favorite__star" class="favorite__star" src="/public/empty-star.png" alt="좋아요안한 별" />'
            }
          </div>
          <p class="restaurantDetail__description text-body marginTopBottom-15">${description}</p>
          <p class="restaurantDetail__link text-body">${link}</p>
        </div>
        <div class="restaurantDetail__buttonWrap">
            <button class="restaurantDetail__button restaurantDetail_delete">삭제하기</button>
            <button class="restaurantDetail__button restaurantDetail_close">닫기</button>
        </div>
        `;

  return $section;
  //   const $distance = createElement({
  //     tag: "span",
  //     classNames: ["restaurant__distance", "text-body"],
  //     content: `캠퍼스부터 ${distance}분 내`,
  //   });
  //   const $name = createElement({
  //     tag: "h3",
  //     classNames: ["restaurant__name text-subtitle"],
  //     content: name,
  //   });
  //   const $description = createElement({
  //     tag: "p",
  //     classNames: ["restaurant__description", "text-body"],
  //     content: description,
  //   });
}
