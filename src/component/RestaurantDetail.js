import toElement from "../utils/toElement.js";

function RestaurantDetail({ category, name, distance, description, link }) {
  return toElement(`<div>${name}</div>`);
}

export default RestaurantDetail;
