import { categoryValue } from "../../data/constants.js";
import { RestaurantData } from "../../data/RestaurantMockData.js";

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
  return information;
};

export default addData;
