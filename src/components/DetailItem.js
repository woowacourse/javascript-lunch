const CATRGORY_IMAGE_PATH = {
  한식: "./public/category-korean.png",
  중식: "./public/category-chinese.png",
  일식: "./public/category-japanese.png",
  양식: "./public/category-western.png",
  아시안: "./public/category-asian.png",
  기타: "./public/category-etc.png",
};

function DetailItem({ category, name, distance, description, link, favoriteStar }) {
  const divElement = document.createElement("div");
  divElement.classList.add("detail-restaurant");

  divElement.innerHTML = /*html*/ `
  <div class="restaurant__category__star mb-16">
      <div class="restaurant__category">
        <img src=${CATRGORY_IMAGE_PATH[category]} alt=${category} class="category-icon" />
      </div>
      <div
      class="favorite-star ${favoriteStar && "active"}"}
      data-name="${name}"
      >
      </div>
  </div>
   <h3 class="restaurant__name text-title mb-16">${name}</h3>
   <span class="restaurant__distance text-body mb-16">캠퍼스부터 ${distance}</span>
   <p class="restaurant__description text-body mb-16">
     ${description}
   </p>
   <a class="restaurant__link text-body mb-16"
   href=${link} target="_blank">
     ${link}
   </a>

`;

  return divElement;
}

export default DetailItem;
