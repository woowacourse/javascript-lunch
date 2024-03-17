import favoritedImage from '../../../../templates/favorite-icon-filled.png';
import unfavoritedImage from '../../../../templates/favorite-icon-lined.png';

export const RESTAURANT_INFO_CONTAINER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'restaurant__info',
});

export const RESTAURANT_LIST_ITEM_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'restaurant',
});

export const RESTAURANT_LIST_ITEM_CONTAINER_COMPONENT_DATA = {
  TAG_CLASS_NAME: 'restaurant__category',
};

export const RESTAURANT_LIST_ITEM_DESCRIPTION_COMPONENT_DATA = {
  TAG_TEXT_CONTENT: (textContent: string) => textContent,
  TAG_CLASS_NAME: 'restaurant__description text-body',
};

export const RESTAURANT_LIST_ITEM_HEADING_COMPONENT_DATA = {
  TAG_CLASS_NAME: 'restaurant__name text-subtitle',
  TAG_LEVEL: (level: number) => level,
  TAG_TEXT_CONTENT: (textContent: string) => textContent,
};

export const RESTAURANT_LIST_ITEM_IMAGE_AND_INFO_CONTAINER = Object.freeze({
  TAG_CLASS_NAME: 'image-info-container',
});

export const RESTAURANT_LIST_ITEM_IMAGE_COMPONENT_DATA = {
  TAG_CLASS_NAME: 'category-icon',
};

export const RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA = {
  TAG_CLASS_NAME: 'favorited-icon',
  TAG_ALT: (isFavorited: boolean) => (isFavorited ? 'unfavorited' : 'favorited'),
  TAG_SRC: (isFavorited: boolean) => (isFavorited ? favoritedImage : unfavoritedImage),
};

export const RESTAURANT_LIST_ITEM_IS_FAVORITED_CONTAINER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'favorited-icon-container',
});

export const RESTAURANT_LIST_ITEM_LINK_COMPONENT_DATA = {
  TAG_HREF: (href: string) => href,
  TAG_CLASS_NAME: '',
  TAG_BLANK: true,
};

export const RESTAURANT_LIST_ITEM_SPAN_COMPONENT_DATA = {
  TAG_TEXT_CONTENT: (textContent: string) => `캠퍼스부터 ${textContent}분 내`,
  TAG_CLASS_NAME: 'restaurant__distance text-body',
};
