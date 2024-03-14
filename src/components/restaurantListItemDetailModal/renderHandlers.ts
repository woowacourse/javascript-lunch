import { RestaurantState } from '../../types/index.d';
import generateContainerComponent from '../../uiUtils/generateContainerComponent';
import IMAGE_AND_FAVORITED_ICON_CONTAINER_COMPONENT_DATA from './componentsData/imageAndFavoritedIconContainerComponentData';
import generateImageComponent from '../../uiUtils/generateImageComponent';
import { generateRestaurantCategoryImageComponentData } from '../../services/generateRestaurantComponentData';
import { getMatchedCategoryInfo } from '../restaurantListItem/matchCategoryImage';
import {
  createDistanceComponent,
  createIsFavoriteImageComponent,
  createTitleComponent,
  createDescriptionComponent,
  createRestaurantLinkComponent,
} from '../../services/createComponent';
import RESTAURANT_DETAIL_CONTAINER_COMPONENT_DATA from './componentsData/detailContainerComponentData';
import CATEGORY_IMAGE_CONTAINER_COMPONENT_DATA from './componentsData/categoryImageContainerComponentData';
import IS_FAVORITED_ICON_CONTAINER_COMPONENT_DATA from './componentsData/isFavoritedIconContainerComponentData';
import BUTTON_CONTAINER_COMPONENT_DATA from './componentsData/buttonContainerComponentData';
import generateButtonComponent from '../../uiUtils/generateButtonComponent';
import DELETE_BUTTON_COMPONENT_DATA from './componentsData/deleteButtonComponentData';
import CLOSE_BUTTON_COMPONENT_DATA from './componentsData/closeButtonComponentData';

const generateCategoryImageAndInfoComponent = (targetRestaurantListItem: RestaurantState) => {
  const imageAndFavoritedContainer = generateContainerComponent(IMAGE_AND_FAVORITED_ICON_CONTAINER_COMPONENT_DATA);
  const restaurantCategory = getMatchedCategoryInfo(targetRestaurantListItem);
  const categoryContainer = generateContainerComponent(CATEGORY_IMAGE_CONTAINER_COMPONENT_DATA);
  const categoryImageComponentData = generateRestaurantCategoryImageComponentData(restaurantCategory);
  const categoryImageComponent = generateImageComponent(categoryImageComponentData);
  const isFavoritedIconContainer = generateContainerComponent(IS_FAVORITED_ICON_CONTAINER_COMPONENT_DATA);
  const isFavoritedIconComponent = createIsFavoriteImageComponent(targetRestaurantListItem.isFavorited);

  isFavoritedIconContainer.appendChild(isFavoritedIconComponent);
  categoryContainer.appendChild(categoryImageComponent);

  imageAndFavoritedContainer.appendChild(categoryContainer);
  imageAndFavoritedContainer.appendChild(isFavoritedIconContainer);

  return imageAndFavoritedContainer;
};

const renderRestaurantListItemBottomSheetComponent = (targetRestaurantListItem: RestaurantState) => {
  const detailContainer = generateContainerComponent(RESTAURANT_DETAIL_CONTAINER_COMPONENT_DATA);
  const fragment = document.createDocumentFragment();
  const categoryImageAndInfoComponent = generateCategoryImageAndInfoComponent(targetRestaurantListItem);
  const restaurantNameComponent = createTitleComponent(targetRestaurantListItem.name);
  const restaurantDistanceComponent = createDistanceComponent(targetRestaurantListItem.distance);
  const restaurantDescriptionComponent = createDescriptionComponent(targetRestaurantListItem.description);
  const restaurantLinkComponent = createRestaurantLinkComponent(targetRestaurantListItem.link);
  const buttonContainer = generateContainerComponent(BUTTON_CONTAINER_COMPONENT_DATA);
  const restaurantListItemDeleteButton = generateButtonComponent(DELETE_BUTTON_COMPONENT_DATA);
  const bottomSheetCloseButtonComponent = generateButtonComponent(CLOSE_BUTTON_COMPONENT_DATA);

  buttonContainer.appendChild(restaurantListItemDeleteButton);
  buttonContainer.appendChild(bottomSheetCloseButtonComponent);
  fragment.appendChild(categoryImageAndInfoComponent);
  fragment.appendChild(restaurantNameComponent);
  fragment.appendChild(restaurantDistanceComponent);
  if (restaurantDescriptionComponent) {
    fragment.appendChild(restaurantDescriptionComponent);
  }
  fragment.appendChild(restaurantLinkComponent);
  fragment.appendChild(buttonContainer);

  detailContainer.appendChild(fragment);

  return detailContainer;
};

export default renderRestaurantListItemBottomSheetComponent;
