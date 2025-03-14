import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import Image from "../common/Image";
import changeModalContents from "../common/Modal/changeModalContents";
import RestaurantInfo from "./RestaurantInfo";
import CategoryImage from "./CategoryImage";
import FavoriteIcon from "./FavoriteIcon";
import RestaurantDetail from "../RestaurantDetail";

const RestaurantCard = (restaurant) => {
  const { category, name, distance, description } = restaurant.value;

  const restaurantCard = createElement({
    tagName: "li",
    classNames: ["restaurant"],
    children: [
      CategoryImage(category),
      RestaurantInfo(restaurant.value),
      FavoriteIcon(restaurant),
    ],
    events: {
      click: () => {
        console.log(`${name} 클릭`);
        changeModalContents(RestaurantDetail(restaurant));
        $(".modal-backdrop").classList.add("open");
      },
    },
  });

  return restaurantCard;
};

export default RestaurantCard;
