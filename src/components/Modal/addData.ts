import { RestaurantData } from "../../constants/RestaurantData.js";
import type { Restaurant } from "../../../types/global.d.ts";
import { categoryValue } from "../../constants/optionValue.js";

const addData = () => {
  const formData = new FormData(
    document.getElementById("input-form") as HTMLFormElement,
  );

  const submittedData = Object.fromEntries(formData);
  const information = {
    name: submittedData.name,
    distance: Number(submittedData.distance),
    description: submittedData.description,
    imgSrc: `./category-${submittedData.category}.png`,
    imgAlt: `${categoryValue[submittedData.category as string]}`,
    category: `${categoryValue[submittedData.category as string]}`,
  };
  RestaurantData.push(information as Restaurant);
  localStorage.setItem(
    `${RestaurantData.length - 1}`,
    JSON.stringify(information),
  ),
    localStorage.setItem("restaurantList", JSON.stringify([...RestaurantData]));
  document.dispatchEvent(new CustomEvent("restaurantUpdated"));
};

export default addData;
