import { parseAttribute } from './../../utils/common/domHelper';
import { getImageSrc } from '../../utils/common/getImageSrc';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { Attribute } from '../../utils/common/domHelper';
interface RestaurantProps {
  info: RestaurantInfo;
  attribute: Attribute;
}

function Restaurant(props: RestaurantProps) {
  const {
    info: { category, name, distance, description, favorite },
    attribute,
  } = props;

  return `
        <li ${attribute ? parseAttribute(attribute) : ''} >
            <div class="restaurant__category">
                <img src=${getImageSrc(category)} alt=${category} class="category-icon">
            </div>
            <div class="restaurant__info">
                ${
                  favorite
                    ? `<img src='./favorite-icon-filled.png' alt="favorite-icon" class="favorite-icon">`
                    : `<img src='./favorite-icon-lined.png' alt="favorite-icon" class="favorite-icon">`
                }
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description text-body">${description}</p>
            </div>
        </li>
    `;
}

export { Restaurant };
