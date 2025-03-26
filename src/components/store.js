import IMG_SRC from "../constants/imgSrc";
import createElement from "../utils/createElement";

// 식당 리스트에서 보여주는 식당 정보
const Store = (storeProps) => {
  const imgSrc = getImgSrc(storeProps.category);

  const list = createElement({
    tag: "li",
    id: storeProps.id,
    classList: ["restaurant"],
  });
  list.innerHTML = `
    <div class="restaurant__category">
      <img src="${imgSrc}" alt=${storeProps.category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${storeProps.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${
        storeProps.dist
      }분 내</span>
      <p class="restaurant__description text-body">
        ${storeProps.description}
      </p>
    </div>
    <div>
      <img src=${
        storeProps.isFavorite
          ? IMG_SRC.STAR_ICON_FILLED
          : IMG_SRC.STAR_ICON_LINED
      } alt="star-icon" class="star-icon">
    </div>
`;
  document.querySelector(".restaurant-list").appendChild(list);
};

const getImgSrc = (category) => {
  return IMG_SRC[category];
};

export default Store;
