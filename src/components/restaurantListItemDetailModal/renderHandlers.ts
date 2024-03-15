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
} from '../../services/createComponent';
import RESTAURANT_DETAIL_CONTAINER_COMPONENT_DATA from './componentsData/detailContainerComponentData';
import CATEGORY_IMAGE_CONTAINER_COMPONENT_DATA from './componentsData/categoryImageContainerComponentData';
import IS_FAVORITED_ICON_CONTAINER_COMPONENT_DATA from './componentsData/isFavoritedIconContainerComponentData';
import BUTTON_CONTAINER_COMPONENT_DATA from './componentsData/buttonContainerComponentData';
import generateButtonComponent from '../../uiUtils/generateButtonComponent';
import DELETE_BUTTON_COMPONENT_DATA from './componentsData/deleteButtonComponentData';
import CLOSE_BUTTON_COMPONENT_DATA from './componentsData/closeButtonComponentData';

/* eslint-disable max-lines-per-function */
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

const generateTotalButtonComponent = () => {
  const buttonContainer = generateContainerComponent(BUTTON_CONTAINER_COMPONENT_DATA);
  const restaurantListItemDeleteButton = generateButtonComponent(DELETE_BUTTON_COMPONENT_DATA);
  const bottomSheetCloseButtonComponent = generateButtonComponent(CLOSE_BUTTON_COMPONENT_DATA);
  buttonContainer.appendChild(restaurantListItemDeleteButton);
  buttonContainer.appendChild(bottomSheetCloseButtonComponent);

  return buttonContainer;
};

/* eslint-disable max-lines-per-function */
const generateTotalCategoryImageAndInfoComponent = (targetRestaurantListItem: RestaurantState) => {
  const fragment = document.createDocumentFragment();
  const categoryImageAndInfoComponent = generateCategoryImageAndInfoComponent(targetRestaurantListItem);
  const restaurantNameComponent = createTitleComponent(targetRestaurantListItem.name);
  const restaurantDistanceComponent = createDistanceComponent(targetRestaurantListItem.distance);
  const restaurantDescriptionComponent = createBottomSheetDescriptionComponent(targetRestaurantListItem.description);
  const restaurantLinkComponent = createBottomSheetRestaurantLinkComponent(targetRestaurantListItem.link);

  fragment.appendChild(categoryImageAndInfoComponent);
  fragment.appendChild(restaurantNameComponent);
  fragment.appendChild(restaurantDistanceComponent);
  if (restaurantDescriptionComponent) {
    fragment.appendChild(restaurantDescriptionComponent);
  }

  const totalButtonComponent = generateTotalButtonComponent();

  fragment.appendChild(restaurantLinkComponent);
  fragment.appendChild(totalButtonComponent);

  return fragment;
};

const renderRestaurantListItemBottomSheetComponent = (targetRestaurantListItem: RestaurantState) => {
  const detailContainer = generateContainerComponent(RESTAURANT_DETAIL_CONTAINER_COMPONENT_DATA);
  const totalCategoryImageAndInfoComponent = generateTotalCategoryImageAndInfoComponent(targetRestaurantListItem);

  detailContainer.appendChild(totalCategoryImageAndInfoComponent);

  return detailContainer;
};

export default renderRestaurantListItemBottomSheetComponent;
