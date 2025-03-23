import ListItem from "./ListItem.js";

function List(listItems) {
  const listElement = document.createElement("ul");
  listElement.classList.add("restaurant-list");
  listElement.classList.add("restaurant-list-container");
  listItems.forEach((item) => {
    listElement.appendChild(ListItem(item.restaurant));
  });

  return listElement;
}

export default List;
