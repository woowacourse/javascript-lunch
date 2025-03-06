import ListItem from "./ListItem.js";

function List(listItems) {
  const listElement = document.createElement("ul");
  listElement.classList.add("restaurant-list");
  listItems.forEach((item) => {
    listElement.appendChild(ListItem(item));
  });

  return listElement;
}

export default List;
