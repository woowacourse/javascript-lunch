import { Restaurant } from "../entities";
import validateCategory from "./validateCategory.js";
import validateDescription from "./validateDescription.js";
import validateDistance from "./validateDistance.js";
import validateLink from "./validateLink.js";
import validateRestaurantName from "./validateRestaurantName.js";

const validateRestaurantForm = (values: Restaurant) => {
  const { category, name, distance, description, link } = values;
  validateCategory(category);
  validateRestaurantName(name);
  validateDistance(distance);
  if (description) validateDescription(description);
  if (link) validateLink(link);
};

export default validateRestaurantForm;
