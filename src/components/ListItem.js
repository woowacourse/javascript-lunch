const CATRGORY_IMAGE_PATH = {
  한식: "./public/category-korean.png",
  중식: "./public/category-chinese.png",
  일식: "./public/category-japanese.png",
  양식: "./public/category-western.png",
  아시안: "./public/category-asian.png",
  기타: "./public/category-etc.png",
};

function renderFavoritesImg(favorites) {
  if (favorites) {
    return "./public/favorite-icon-filled.png";
  }
  return "./public/favorite-icon-lined.png";
}

function ListItem({ id, category, name, distance, description, favorites, link }, { onClick = null, className = "" }) {
  const listElement = document.createElement("li");
  listElement.classList.add(`restaurant`);
  listElement.dataset.id = id;
  if (onClick) {
    listElement.addEventListener("click", (event) => onClick(event));
  }

  if (className === "information") {
    listElement.classList.add(className);
  }

  function createLink() {
    if (className === "information") {
      return `<a href="${link} class="link__text">${link}</a>`;
    }
    return "";
  }

  listElement.innerHTML = `
    <div class="restaurant__category">
      <img src=${CATRGORY_IMAGE_PATH[category]} alt=${category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}</span>
      <p class="restaurant__description text-body">
      ${description}
      </p>
      </div>
      <img src="${renderFavoritesImg(favorites)}" alt=favorites class="favorites-icon" />
      ${createLink()}
    `;
  return listElement;
}

export default ListItem;
