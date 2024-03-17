import buttonImage from '../../../../templates/add-button.png';

export const HEADER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'gnb',
});

export const HEADER_BUTTON_IMAGE_COMPONENT_DATA = Object.freeze({
  TAG_SRC: buttonImage,
  TAG_ALT: '음식점 추가',
});

export const HEADER_H1_COMPONENT_DATA = Object.freeze({
  TAG_LEVEL: 1,
  TAG_CLASS_NAME: 'gnb__title text-title',
  TAG_TEXT_CONTENT: '점심 뭐 먹지',
});

export const HEADER_BUTTON_COMPONENT_DATA = Object.freeze({
  TAG_TYPE: 'button',
  TAG_CLASS_NAME: 'gnb__button',
  TAG_ARIA_LABEL: '음식점 추가',
});
