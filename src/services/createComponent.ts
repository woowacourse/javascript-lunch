import {
  generateRestaurantDescriptionComponentData,
  generateRestaurantNameComponentData,
  generateRestaurantIsFavoritedComponentData,
  generateRestaurantDistanceComponentData,
  generateRestaurantLinkComponentData,
} from './generateRestaurantComponentData';
import generateHeadingComponent from '../uiUtils/generateHeadingComponent';
import generateSpanComponent from '../uiUtils/generateSpanComponent';
import generatePComponent from '../uiUtils/generatePComponent';
import generateImageComponent from '../uiUtils/generateImageComponent';
import generateATagComponenet from '../uiUtils/generateATagComponent';

export const createTitleComponent = (name: string) => {
  const titleComponentData = generateRestaurantNameComponentData(name);
  return generateHeadingComponent(titleComponentData);
};

export const createDistanceComponent = (distance: string) => {
  const distanceComponentData = generateRestaurantDistanceComponentData(distance);
  return generateSpanComponent(distanceComponentData);
};

export const createDescriptionComponent = (description?: string) => {
  if (description) {
    const descriptionComponentData = generateRestaurantDescriptionComponentData(description);
    return generatePComponent(descriptionComponentData);
  }
};

export const createIsFavoriteImageComponent = (isFavorited: boolean) => {
  const isFavoritedComponentData = generateRestaurantIsFavoritedComponentData(isFavorited);
  return generateImageComponent(isFavoritedComponentData);
};

export const createRestaurantLinkComponent = (link?: string) => {
  const restaurantLinkComponentData = generateRestaurantLinkComponentData(link);

  return generateATagComponenet(restaurantLinkComponentData);
};
