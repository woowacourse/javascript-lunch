import { DistanceByWalk } from '../../enum/enums';
import { RestaurantDataType } from '../../type/restaurantTypes';
import './RestaurantItemContainer.css';

export default function RestaurantItemContainer(restaurantData: RestaurantDataType) {
  const container = document.createElement('div');
  container.classList.add('restaurant__info');

  const restaurantTitle = (name: string) => {
    const title = document.createElement('h3');
    title.classList.add('restaurant__name', 'text-subtitle');
    title.textContent = name;
    return title;
  };

  const restaurantDistance = (distanceByWalk: DistanceByWalk) => {
    const distance = document.createElement('span');
    distance.classList.add('restaurant__distance', 'text-body');
    distance.textContent = `캠퍼스부터 ${distanceByWalk}분 내`;
    return distance;
  };

  const restaurantDescription = (description?: string) => {
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add('restaurant__description', 'text-body');
    descriptionParagraph.textContent = description ?? '';
    return descriptionParagraph;
  };

  container.appendChild(restaurantTitle(restaurantData.name));
  container.appendChild(restaurantDistance(restaurantData.distanceByWalk));
  container.appendChild(restaurantDescription(restaurantData.description));

  return container;
}
