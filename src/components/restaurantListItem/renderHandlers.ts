import { CategoryInfo, RestaurantState } from '../../types';
import generateContainerComponent from '../../uiUtils/generateContainerComponent';
import generateHeadingComponent from '../../uiUtils/generateHeadingComponent';
import generateImageComponent from '../../uiUtils/generateImageComponent';
import generateListComponent from '../../uiUtils/generateListComponent';
import generatePComponent from '../../uiUtils/generatePComponent';
import generateSpanComponent from '../../uiUtils/generateSpanComponent';

import RESTAURANT_INFO_CONTAINER_COMPONENT_DATA from './componentsData/RestaurantInfoContainerComponentData';
import RESTAURANT_LIST_ITEM_COMPONENT_DATA from './componentsData/RestaurantListItemComponentData';
import RESTAURANT_LIST_ITEM_CONTAINER_COMPONENT_DATA from './componentsData/RestaurantListItemContainerComponentData';
import RESTAURANT_LIST_ITEM_DESCRIPTION_COMPONENT_DATA from './componentsData/RestaurantListItemDescriptionComponentData';
import RESTAURANT_LIST_ITEM_HEADING_COMPONENT_DATA from './componentsData/RestaurantListItemHeadingComponentData';
import RESTAURANT_LIST_ITEM_IMAGE_COMPONENT_DATA from './componentsData/RestaurantListItemImageComponentData';
import RESTAURANT_LIST_ITEM_SPAN_COMPONENT_DATA from './componentsData/RestaurantListItemSpanComponentData';
import RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA from './componentsData/RestaurantListItemIsFavoritedComponentData';
import RESTAURANT_LIST_ITEM_IMAGE_AND_INFO_CONTAINER from './componentsData/RestaurantListItemImageAndInfoContainer';
import RESTAURANT_LIST_ITEM_IS_FAVORITED_CONTAINER_COMPONENT_DATA from './componentsData/RestaurantListItemIsFavoritedCotainerComponentData';
import { getMatchedCategoryInfo } from './matchCategoryImage';

const generateImageComponentData = (categoryInfo: CategoryInfo) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_IMAGE_COMPONENT_DATA,
    TAG_SRC: categoryInfo.src,
    TAG_ALT: categoryInfo.alt,
  };

  return componentData;
};

const generateHeadingComponentData = (restaurantName: string) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_HEADING_COMPONENT_DATA,
    TAG_TEXT_CONTENT: RESTAURANT_LIST_ITEM_HEADING_COMPONENT_DATA.TAG_TEXT_CONTENT(restaurantName),
    TAG_LEVEL: 3,
  };

  return componentData;
};

const generateSpanComponentData = (textContent: string) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_SPAN_COMPONENT_DATA,
    TAG_TEXT_CONTENT: RESTAURANT_LIST_ITEM_SPAN_COMPONENT_DATA.TAG_TEXT_CONTENT(textContent),
  };

  return componentData;
};

const generateDescriptionComponentData = (textContent?: string) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_DESCRIPTION_COMPONENT_DATA,
    TAG_TEXT_CONTENT: textContent ?? '',
  };

  return componentData;
};

const generateIsFavoritedComponentData = (isFavorited: boolean) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA,
    TAG_ALT: RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA.TAG_ALT(isFavorited),
    TAG_SRC: RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA.TAG_SRC(isFavorited),
  };

  return componentData;
};

const generateRestaurantListItemImageComponent = (categoryInfo: CategoryInfo) => {
  const restaurantImageContainer = generateContainerComponent(RESTAURANT_LIST_ITEM_CONTAINER_COMPONENT_DATA);
  const imageComponentData = generateImageComponentData(categoryInfo);
  const restaurantListItemImageComponent = generateImageComponent(imageComponentData);
  restaurantImageContainer.appendChild(restaurantListItemImageComponent);

  return restaurantImageContainer;
};

const createTitleComponent = (name: string) => {
  const titleComponentData = generateHeadingComponentData(name);
  return generateHeadingComponent(titleComponentData);
};

const createDistanceComponent = (distance: string) => {
  const distanceComponentData = generateSpanComponentData(distance);
  return generateSpanComponent(distanceComponentData);
};

const createDescriptionComponent = (description: string) => {
  const descriptionComponentData = generateDescriptionComponentData(description);
  return generatePComponent(descriptionComponentData);
};

const createIsFavoriteImageComponent = (isFavorited: boolean) => {
  const isFavoritedComponentData = generateIsFavoritedComponentData(isFavorited);
  return generateImageComponent(isFavoritedComponentData);
};

const generateRestaurantListItemInfoComponent = (restaurant: RestaurantState) => {
  const restaurantInfoContainer = generateContainerComponent(RESTAURANT_INFO_CONTAINER_COMPONENT_DATA);
  const restaurantInfoTitleComponent = createTitleComponent(restaurant.name);
  const restaurantInfoDistanceComponent = createDistanceComponent(restaurant.distance);
  const restaurantDescriptionComponent = createDescriptionComponent(restaurant.description ?? '');
  restaurantInfoContainer.appendChild(restaurantInfoTitleComponent);
  restaurantInfoContainer.appendChild(restaurantInfoDistanceComponent);
  restaurantInfoContainer.appendChild(restaurantDescriptionComponent);
  return restaurantInfoContainer;
};

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
