import { Category, DistanceByWalk } from '../../../enum/enums';
import { RestaurantDataType } from '../../../type/restaurantDataType';
import createCategoryContainer from '../../../util/createCategoryContainer';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import './RestaurantDetailContainer.css';

export default function RestaurantDetailContainer(restaurantData: RestaurantDataType) {
  const container = document.createElement('div');
  container.classList.add('restaurant__detail');

  const favoriteButton = (isFavorite?: boolean) => {
    const favoriteButton = new FavoriteButton(isFavorite ?? false).render();
    return favoriteButton;
  };

  const restaurantCategory = (category: Category) => {
    return createCategoryContainer(category);
  };

  const restaurantTitle = (name: string) => {
    const restaurantTitle = document.createElement('h3');
    restaurantTitle.classList.add('restaurant__name', 'text-subtitle');
    restaurantTitle.textContent = name;
    return restaurantTitle;
  };

  const restaurantDistance = (distanceByWalk: DistanceByWalk) => {
    const restaurantDistance = document.createElement('span');
    restaurantDistance.classList.add('restaurant__distance', 'text-body');
    restaurantDistance.textContent = `캠퍼스부터 ${distanceByWalk}분 내`;
    return restaurantDistance;
  };

  const restaurantDescription = (description: string) => {
    const restaurantDescription = document.createElement('p');
    restaurantDescription.classList.add('restaurant__description', 'text-body');
    restaurantDescription.textContent = description;
    return restaurantDescription;
  };

  const restaurantReference = (name: string, referenceUrl: string) => {
    const restaurantReference = document.createElement('a');
    restaurantReference.classList.add('restaurant__reference');
    restaurantReference.textContent = referenceUrl;
    restaurantReference.href = referenceUrl;
    restaurantReference.title = name;
    return restaurantReference;
  };

  container.append(
    favoriteButton(restaurantData.favorite),
    restaurantCategory(restaurantData.category),
    restaurantTitle(restaurantData.name),
    restaurantDistance(restaurantData.distanceByWalk),
  );
  // container.appendChild(restaurantCategory(restaurantData.category));
  // container.appendChild(restaurantTitle(restaurantData.name));
  // container.appendChild(restaurantDistance(restaurantData.distanceByWalk));

  if (restaurantData.description) {
    container.appendChild(restaurantDescription(restaurantData.description));
  }
  if (restaurantData.referenceUrl) {
    container.appendChild(restaurantReference(restaurantData.name, restaurantData.referenceUrl));
  }

  return container;
}
