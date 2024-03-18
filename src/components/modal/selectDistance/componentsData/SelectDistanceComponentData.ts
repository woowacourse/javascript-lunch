import SELECT_DISTANCE_UI_OPITONS from '../../../../constants/selectOptions/selectDistanceUiOptions';

export const SELECT_DISTANCE_COMPONENT_DATA = Object.freeze({
  UI_OPTIONS: SELECT_DISTANCE_UI_OPITONS,
  TAG_ID: 'distance',
  TAG_NAME: 'distance',
  TAG_REQUIRED: true,
});

export const DISTANCE_LABEL_COMPONENT_DATA = Object.freeze({
  TAG_HTML_FOR: 'distance text-caption',
  TAG_TEXT: '거리(도보 이동 시간) ',
});

export const DISTANCE_CONTAINER_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'form-item form-item--required distance-container',
});
