import { Irestaurant } from "../../types";
import { baseTemplate, categoryTemplate, template } from "./template";
import categoryMatchedImageData from "./categoryMatchedImageData";

function Restaurant() {
  const render = (restaurant: Irestaurant) => {
    const categoryInfo = getMatchedCategoryInfo(restaurant);

    const restaurantContainer = baseTemplate(
      categoryTemplate(categoryInfo),
      template(restaurant),
    );

    return restaurantContainer;
  };

  const findCategory = (restaurant: Irestaurant) => {
    return categoryMatchedImageData.find(
      (item) => item.category === restaurant.category,
    );
  };

  const getMatchedCategoryInfo = (restaurant: Irestaurant) => {
    const categoryInfo = findCategory(restaurant);

    if (categoryInfo) {
      return categoryInfo;
    }
    return {
      categoryImg: "",
      category: "",
    };
  };

  return {
    render,
  };
}

export default Restaurant;
