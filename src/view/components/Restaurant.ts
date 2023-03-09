import { getImageSrc } from '../../utils/common/getImageSrc';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import '../../assets/favorite-icon-filled.png';
import '../../assets/favorite-icon-lined.png';
interface RestaurantProps {
  info: RestaurantInfo;
}

function Restaurant(props: RestaurantProps) {
  const {
    info: { id, category, name, distance, description },
  } = props;

  return `
        <li class="restaurant" data-id=${id}>
            <div class="restaurant__category">
                <img src=${getImageSrc(category)} alt=${category} class="category-icon">
            </div>
            <div class="restaurant__info">
                <img src='./favorite-icon-lined.png' alt="favorite-icon" class="favorite-icon">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description text-body">${description}</p>
            </div>
        </li>
    `;
}

export { Restaurant };
