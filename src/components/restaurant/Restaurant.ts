import { Irestaurant } from "../../types";
import { baseTemplate, categoryTemplate, template } from "./template";

import koreanCategoryImage from "../../../templates/category-korean.png";
import chinesecategoryImage from "../../../templates/category-chinese.png";
import japaneseCategoryImage from "../../../templates/category-japanese.png";
import westernCategoryImage from "../../../templates/category-western.png";
import asianCategoryImage from "../../../templates/category-asian.png";
import etcCategoryImage from "../../../templates/category-etc.png";

function Restaurant() {
  const mockData = [
    {
      category: "한식",
      categoryImg: koreanCategoryImage,
    },
    {
      category: "중식",
      categoryImg: chinesecategoryImage,
    },
    {
      category: "일식",
      categoryImg: japaneseCategoryImage,
    },
    {
      category: "양식",
      categoryImg: westernCategoryImage,
    },
    {
      category: "아시안",
      categoryImg: asianCategoryImage,
    },
    {
      category: "기타",
      categoryImg: etcCategoryImage,
    },
  ];

  // console.log();
  const findCategory = (restaurant: Irestaurant) => {
    const categoryInfo = mockData.find(
      (item) => item.category === restaurant.category,
    );

    if (categoryInfo) {
      return categoryInfo;
    }

    return {
      categoryImg: "",
      category: "",
    };
  };

  const render = (restaurant: Irestaurant) => {
    const categoryInfo = findCategory(restaurant);

    const restaurantContainer = baseTemplate(
      categoryTemplate(categoryInfo),
      template(restaurant),
    );

    // restaurantContainer.innerText += categoryTemplate(categoryInfo);
    // restaurantContainer.innerText += template(restaurant);

    return restaurantContainer;
  };

  return {
    render,
  };
}

export default Restaurant;
