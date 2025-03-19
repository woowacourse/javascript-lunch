import StarIcon from "./StarIcon";
import CategoryIcon from "./CategoryIcon";
import RestaurantName from "./RestaurantName";
import RestaurantDistance from "./RestaurantDistance";
import RestaurantDescription from "./RestaurantDescription";

const Restaurant = (restaurantProps) => {
  return /*html*/ ` 
    ${CategoryIcon(restaurantProps.category)}
    <div class="restaurant__info">
      <div class="restaurant__info_header">
        <div>
          ${RestaurantName(restaurantProps.name)}
          ${RestaurantDistance(restaurantProps.dist)}
        </div>
        ${StarIcon(restaurantProps.isFavorite)}
      </div>
      ${RestaurantDescription(restaurantProps.description)}
    </div>
  `;
};

export default Restaurant;
