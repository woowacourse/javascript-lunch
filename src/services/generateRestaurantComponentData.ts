import {
  RESTAURANT_LIST_ITEM_IMAGE_COMPONENT_DATA,
  RESTAURANT_LIST_ITEM_HEADING_COMPONENT_DATA,
  RESTAURANT_LIST_ITEM_SPAN_COMPONENT_DATA,
  RESTAURANT_LIST_ITEM_DESCRIPTION_COMPONENT_DATA,
  RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA,
  RESTAURANT_LIST_ITEM_LINK_COMPONENT_DATA,
} from '../components/restaurantListItem/componentsData/RestaurantInfoComponentData';

import {
  BOTTOM_SHEET_DESCRIPTION_COMPONENT_DATA,
  BOTTOM_SHEET_LINK_COMPONENT_DATA,
} from '../components/restaurantListItemDetailModal/componentsData/BottomSheetModalComponentData';
import { CategoryInfo } from '../types';

export const generateRestaurantCategoryImageComponentData = (categoryInfo: CategoryInfo) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_IMAGE_COMPONENT_DATA,
    TAG_SRC: categoryInfo.src,
    TAG_ALT: categoryInfo.alt,
  };

  return componentData;
};

export const generateRestaurantNameComponentData = (restaurantName: string) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_HEADING_COMPONENT_DATA,
    TAG_TEXT_CONTENT: RESTAURANT_LIST_ITEM_HEADING_COMPONENT_DATA.TAG_TEXT_CONTENT(restaurantName),
    TAG_LEVEL: 3,
  };

  return componentData;
};

export const generateRestaurantDistanceComponentData = (textContent: string) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_SPAN_COMPONENT_DATA,
    TAG_TEXT_CONTENT: RESTAURANT_LIST_ITEM_SPAN_COMPONENT_DATA.TAG_TEXT_CONTENT(textContent),
  };

  return componentData;
};

export const generateRestaurantDescriptionComponentData = (textContent?: string) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_DESCRIPTION_COMPONENT_DATA,
    TAG_TEXT_CONTENT: textContent ?? '',
  };

  return componentData;
};

export const generateRestaurantBottomSheetDescriptionComponentData = (textContent?: string) => {
  const componentData = {
    ...BOTTOM_SHEET_DESCRIPTION_COMPONENT_DATA,
    TAG_TEXT_CONTENT: textContent ?? '',
  };

  return componentData;
};

export const generateRestaurantBottomSheetLinkComponentData = (link?: string) => {
  const componentData = {
    ...BOTTOM_SHEET_LINK_COMPONENT_DATA,
    TAG_HREF: BOTTOM_SHEET_LINK_COMPONENT_DATA.TAG_HREF(link) ?? '',
    TAG_TEXT_CONTENT: BOTTOM_SHEET_LINK_COMPONENT_DATA.TAG_TEXT_CONTENT(link),
  };

  return componentData;
};

export const generateRestaurantIsFavoritedComponentData = (isFavorited: boolean) => {
  const componentData = {
    ...RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA,
    TAG_ALT: RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA.TAG_ALT(isFavorited),
    TAG_SRC: RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA.TAG_SRC(isFavorited),
  };

  return componentData;
};

export const generateRestaurantLinkComponentData = (link?: string) => ({
  ...RESTAURANT_LIST_ITEM_LINK_COMPONENT_DATA,
  TAG_HREF: RESTAURANT_LIST_ITEM_LINK_COMPONENT_DATA.TAG_HREF(link || ''),
});
