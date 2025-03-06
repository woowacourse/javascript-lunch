function ListItem({ category, name, distance, description }) {
  const listElement = document.createElement("li");
  listElement.classList.add("restaurant");
  listElement.innerHTML = `
    <div class="restaurant__category">
      <img src="./public/category-korean.png" alt=${category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">${distance}</span>
      <p class="restaurant__description text-body">
        ${description}
      </p>
    </div>
    `;
  return listElement;
}

export default ListItem;
