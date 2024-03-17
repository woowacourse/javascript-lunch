import { ROOT_RESTAURANT_CATEGORY_UI_OPIONS } from '../../../constants/selectOptions/restaurantCategoryUiOptions';
import { MODAL_RESTAURANT_CATEGORY_UI_OPTIONS } from '../../../constants/selectOptions/restaurantCategoryUiOptions';

export const FILTER_BAR_SECTION_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: 'restaurant-filter-container',
});

export const MAIN_TAG_COMPONENT_DATA = Object.freeze({
  TAG_CLASS_NAME: '',
});

export const RESTAURANT_CATEGORY_DATA = Object.freeze({
  UI_OPTIONS: ROOT_RESTAURANT_CATEGORY_UI_OPIONS,
  TAG_ID: 'category-filter',
  TAG_NAME: 'category',
  TAG_CLASS_NAME: 'restaurant-filter',
});

export const SELECT_CATEGORY_COMPONENT_DATA = Object.freeze({
  UI_OPTIONS: MODAL_RESTAURANT_CATEGORY_UI_OPTIONS,
  TAG_ID: 'category',
  TAG_NAME: 'category',
  TAG_REQUIRED: true,
});

export const SELECT_CATEGORY_LABEL_COMPONENT_DATA = Object.freeze({
  TAG_HTML_FOR: 'category text-caption',
  TAG_TEXT: '카테고리',
});

export const SORT_BY_NAME_OR_CATEGORY_DATA = Object.freeze({
  UI_OPTIONS: [
    { value: 'name', text: '이름순' },
    { value: 'distance', text: '거리순' },
  ],
  TAG_ID: 'sorting-filter',
  TAG_NAME: 'sorting',
  TAG_CLASS_NAME: 'restaurant-filter',
});
