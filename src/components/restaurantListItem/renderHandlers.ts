import { CategoryInfo, RestaurantState } from '../../types';
import generateContainerComponent from '../../uiUtils/generateContainerComponent';
import generateImageComponent from '../../uiUtils/generateImageComponent';
import generateListComponent from '../../uiUtils/generateListComponent';

import {
  RESTAURANT_INFO_CONTAINER_COMPONENT_DATA,
  RESTAURANT_LIST_ITEM_COMPONENT_DATA,
  RESTAURANT_LIST_ITEM_CONTAINER_COMPONENT_DATA,
  RESTAURANT_LIST_ITEM_IMAGE_AND_INFO_CONTAINER,
  RESTAURANT_LIST_ITEM_IS_FAVORITED_CONTAINER_COMPONENT_DATA,
} from './componentsData/RestaurantInfoComponentData';

import { getMatchedCategoryInfo } from './matchCategoryImage';
import { generateRestaurantCategoryImageComponentData } from '../../services/generateRestaurantComponentData';
import {
  createDistanceComponent,
  createTitleComponent,
  createDescriptionComponent,
  createIsFavoriteImageComponent,
} from '../../services/createComponent';

const generateRestaurantListItemImageComponent = (categoryInfo: CategoryInfo) => {
  const restaurantImageContainer = generateContainerComponent(RESTAURANT_LIST_ITEM_CONTAINER_COMPONENT_DATA);
  const imageComponentData = generateRestaurantCategoryImageComponentData(categoryInfo);
  const restaurantListItemImageComponent = generateImageComponent(imageComponentData);
  restaurantImageContainer.appendChild(restaurantListItemImageComponent);

  return restaurantImageContainer;
};

const generateRestaurantListItemInfoComponent = (restaurant: RestaurantState) => {
  const restaurantInfoContainer = generateContainerComponent(RESTAURANT_INFO_CONTAINER_COMPONENT_DATA);
  const restaurantInfoTitleComponent = createTitleComponent(restaurant.name);
  const restaurantInfoDistanceComponent = createDistanceComponent(restaurant.distance);
  const restaurantDescriptionComponent = createDescriptionComponent(restaurant.description);
  restaurantInfoContainer.appendChild(restaurantInfoTitleComponent);
  restaurantInfoContainer.appendChild(restaurantInfoDistanceComponent);
  if (restaurantDescriptionComponent) restaurantInfoContainer.appendChild(restaurantDescriptionComponent);
  return restaurantInfoContainer;
};

/* eslint-disable max-lines-per-function */
const generateRestaurantListItemComponent = (restaurant: RestaurantState) => {
  const matchedCategoryInfo = getMatchedCategoryInfo(restaurant);
  const listComponent = generateListComponent(RESTAURANT_LIST_ITEM_COMPONENT_DATA);
  const infoAndImageContainerComponent = generateContainerComponent(RESTAURANT_LIST_ITEM_IMAGE_AND_INFO_CONTAINER);
  const restaurantListItemImageComponent = generateRestaurantListItemImageComponent(matchedCategoryInfo);
  const restaurantListItemInfoComponent = generateRestaurantListItemInfoComponent(restaurant);
  infoAndImageContainerComponent.appendChild(restaurantListItemImageComponent);
  infoAndImageContainerComponent.appendChild(restaurantListItemInfoComponent);
  const isFavoritedImageContainerComponent = generateContainerComponent(
    RESTAURANT_LIST_ITEM_IS_FAVORITED_CONTAINER_COMPONENT_DATA,
  );
  const restaurantListItemisFavoritedImageComponent = createIsFavoriteImageComponent(restaurant.isFavorited);
  isFavoritedImageContainerComponent.appendChild(restaurantListItemisFavoritedImageComponent);

  listComponent.appendChild(infoAndImageContainerComponent);
  listComponent.appendChild(isFavoritedImageContainerComponent);
  listComponent.dataset.id = String(restaurant.id);
  return listComponent;
};

export default generateRestaurantListItemComponent;
