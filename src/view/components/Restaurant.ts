import { getImageSrc } from '../../utils/common/getImageSrc';
import '../../assets/category-korean.png';
import { Category, RestaurantInfo } from '../../domain/model/LunchRecommendation';

interface RestaurantProps {
  info: RestaurantInfo;
}

function Restaurant(props: RestaurantProps) {
  const {
    info: { category, name, distance, description },
  } = props;
  return `
        <li class="restaurant">
            <div class="restaurant__category">
                <img src=${getImageSrc(category)} alt=${category} class="category-icon">
            </div>
            <div class="restaurant__info">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description text-body">${description}</p>
            </div>
        </li>
    `;
}

export { Restaurant };
