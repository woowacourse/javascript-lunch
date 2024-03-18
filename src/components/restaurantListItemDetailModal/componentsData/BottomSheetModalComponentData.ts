export const BOTTOM_SHEET_DESCRIPTION_COMPONENT_DATA = {
  TAG_CLASS_NAME: 'bottom-sheet-description',
  TAG_TEXT_CONTENT: (textContent: string) => textContent,
};

export const BOTTOM_SHEET_LINK_COMPONENT_DATA = {
  TAG_CLASS_NAME: 'bottom-sheet-link',
  TAG_TEXT_CONTENT: (link?: string) => link ?? '',
  TAG_HREF: (link?: string) => link ?? '',
  TAG_BLANK: true,
};

export const BUTTON_CONTAINER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'button-container bottom-sheet-button',
});

export const CATEGORY_IMAGE_CONTAINER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'restaurant__category',
});

export const CLOSE_BUTTON_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'button button--primary text-caption',
  TAG_TEXT: '닫기',
  TAG_TYPE: 'submit',
});

export const DELETE_BUTTON_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'button button--secondary text-caption',
  TAG_TEXT: '삭제하기',
});

export const RESTAURANT_DETAIL_CONTAINER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'detail-container',
});

export const IMAGE_AND_FAVORITED_ICON_CONTAINER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'image-favorite-container',
});

export const IS_FAVORITED_ICON_CONTAINER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'favorited-icon-container',
});
