import IMG_SRC from "../constants/imgSrc";

const Store = (storeProps) => {
  const imgSrc = getImgSrc(storeProps.category);

  return `
    <div class="restaurant__category">
      <img src="${imgSrc}" alt=${storeProps.category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${storeProps.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${storeProps.dist}분 내</span>
      <p class="restaurant__description text-body">
        ${storeProps.description}
      </p>
    </div>`;
};

const getImgSrc = (category) => {
  return IMG_SRC[category];
};

export default Store;
