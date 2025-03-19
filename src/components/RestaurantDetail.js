import StarIcon from "./StarIcon";
import CategoryIcon from "./CategoryIcon";
import RestaurantName from "./RestaurantName";
import RestaurantDistance from "./RestaurantDistance";
import RestaurantDescription from "./RestaurantDescription";
import RestaurantLink from "./RestaurantLink";

const RestaurantDetail = (restaurantProps) => {
  return /*html*/ `
    <div class="restaurant__info_header">
      ${CategoryIcon(restaurantProps.category)}
      ${StarIcon(restaurantProps.isFavorite)}
    </div>
    <div class="restaurant__info restaurant__info_detail">
      ${RestaurantName(restaurantProps.name)}
      ${RestaurantDistance(restaurantProps.dist)}      
      ${RestaurantDescription(restaurantProps.description, true)}
      ${RestaurantLink(restaurantProps.link)}
    </div>
  `;
};

export default RestaurantDetail;
