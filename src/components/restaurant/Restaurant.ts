import { Irestaurant } from "../../types";
import { baseTemplate, categoryTemplate, template } from "./template";
import categoryMatchedImageData from "./categoryMatchedImageData";

function Restaurant(restaurant: Irestaurant) {
  const render = () => {
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
    if (categoryInfo) return categoryInfo;

    return {
      categoryImg: "",
      category: "",
    };
  };

  render();
}

export default Restaurant;
