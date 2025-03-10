import { categoryValue } from "../../constants/optionValue.js";
import { RestaurantData } from "../../constants/RestaurantData.js";
import Restaurant from "../Restaurant/Restaurant.js";

const addData = () => {
  const formData = new FormData(document.getElementById("input-form"));
  const submittedData = Object.fromEntries(formData);
  const information = {
    name: submittedData.name,
    distance: Number(submittedData.distance),
    description: submittedData.description,
    imgSrc: `./category-${submittedData.category}.png`,
    imgAlt: `${categoryValue[submittedData.category]}`,
  };
  RestaurantData.push(information);
  document.dispatchEvent(new CustomEvent("restaurantUpdated"));
};

export default addData;
