import IMG_SRC from "../constants/imgSrc.js";

const getImgSrc = (category) => {
  return IMG_SRC[category];
};

const CategoryIcon = (category) => {
  const imgSrc = getImgSrc(category);

  return /*html*/ `
    <div class="restaurant__category">
      <img src="${imgSrc}" alt=${category} class="category-icon" />
    </div>
  `;
};

export default CategoryIcon;
