import { CATEGORY_IMAGES } from '../assets/images';
import { RestaurantType } from '../types/restaurants';

interface RestaurantProps extends RestaurantType {}

const Restaurant = (props: RestaurantProps) => {
  const { category, name, distance, description, isFavorite } = props;
  return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img
          src="${CATEGORY_IMAGES[category]}"
          alt="${category}"
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">
          캠퍼스부터 ${distance}분 내
        </span>
        <p class="restaurant__description text-body">
          ${description}
        </p>
      </div>
    </li>
  `;
};

export default Restaurant;
