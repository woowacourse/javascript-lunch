import { RestaurantState } from '../../types/index.d';
import generateContainerComponent from '../../uiUtils/generateContainerComponent';
import {
  IMAGE_AND_FAVORITED_ICON_CONTAINER_COMPONENT_DATA,
  RESTAURANT_DETAIL_CONTAINER_COMPONENT_DATA,
  CATEGORY_IMAGE_CONTAINER_COMPONENT_DATA,
  IS_FAVORITED_ICON_CONTAINER_COMPONENT_DATA,
  BUTTON_CONTAINER_COMPONENT_DATA,
  DELETE_BUTTON_COMPONENT_DATA,
  CLOSE_BUTTON_COMPONENT_DATA,
} from './componentsData/BottomSheetModalComponentData';
import generateImageComponent from '../../uiUtils/generateImageComponent';
import { generateRestaurantCategoryImageComponentData } from '../../services/generateRestaurantComponentData';
import { getMatchedCategoryInfo } from '../restaurantListItem/matchCategoryImage';
import {
  createDistanceComponent,
  createIsFavoriteImageComponent,
  createTitleComponent,
  createBottomSheetDescriptionComponent,
  createBottomSheetRestaurantLinkComponent,
} from '../../services/createComponent';
import generateButtonComponent from '../../uiUtils/generateButtonComponent';

function generateCategoryImageComponent(targetRestaurantListItem: RestaurantState) {
  const categoryContainer = generateContainerComponent(CATEGORY_IMAGE_CONTAINER_COMPONENT_DATA);
  const restaurantCategory = getMatchedCategoryInfo(targetRestaurantListItem);
  const categoryImageComponentData = generateRestaurantCategoryImageComponentData(restaurantCategory);
  const categoryImageComponent = generateImageComponent(categoryImageComponentData);

  categoryContainer.appendChild(categoryImageComponent);
  return categoryContainer;
}

function generateFavoritedIconComponent(targetRestaurantListItem: RestaurantState) {
  const isFavoritedIconContainer = generateContainerComponent(IS_FAVORITED_ICON_CONTAINER_COMPONENT_DATA);
  const isFavoritedIconComponent = createIsFavoriteImageComponent(targetRestaurantListItem.isFavorited);

  isFavoritedIconContainer.appendChild(isFavoritedIconComponent);
  return isFavoritedIconContainer;
}

function generateCategoryImageAndInfoComponent(targetRestaurantListItem: RestaurantState) {
  const imageAndFavoritedContainer = generateContainerComponent(IMAGE_AND_FAVORITED_ICON_CONTAINER_COMPONENT_DATA);
  const categoryImageComponent = generateCategoryImageComponent(targetRestaurantListItem);
  const favoritedIconComponent = generateFavoritedIconComponent(targetRestaurantListItem);

  imageAndFavoritedContainer.appendChild(categoryImageComponent);
  imageAndFavoritedContainer.appendChild(favoritedIconComponent);

  return imageAndFavoritedContainer;
}

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
