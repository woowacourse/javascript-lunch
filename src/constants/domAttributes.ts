import { Attribute } from '../types/ui';

const FILTER_ATTRIBUTE: Record<string, Attribute> = {
  CATEGORY: {
    id: 'category-filter',
    name: 'category',
    className: 'restaurant-filter',
    required: false,
  },
  SORTING: {
    id: 'sorting-filter',
    name: 'sorting',
    className: 'restaurant-filter',
    required: false,
  },
};

const FORM_ATTRIBUTE: Record<string, Attribute> = {
  CATEGORY_SELECT: { id: 'category', name: 'category', required: true },
  DISTANCE_SELECT: { id: 'distance', name: 'distance', required: true },
  NAME_INPUT: { id: 'name', name: 'name', required: true, type: 'text' },
  LINK_INPUT: { id: 'link', name: 'link', required: false, type: 'text' },
};

const TAB_BUTTON_ATTRIBUTE: Record<string, Attribute> = {
  ALL_RESTAURANTS_INPUT: {
    id: 'all-restaurants',
    name: 'tab',
    className: 'tab-item',
    checked: true,
  },
  ALL_RESTAURANTS_LABEL: {
    for: 'all-restaurants',
    className: 'tab-name',
  },
  FAVORITE_RESTAURANTS_INPUT: {
    id: 'favorite-restaurants',
    name: 'tab',
    className: 'tab-item',
    checked: false,
  },
  FAVORITE_RESTAURANTS_LABEL: {
    for: 'favorite-restaurants',
    className: 'tab-name',
  },
};

const MODAL_ATTRIBUTE: Record<string, Attribute> = {
  FORM: { id: 'form' },
  RESTAURANT_INFORMATION: { id: 'restaurant-information' },
};

const CAPTION_ATTRIBUTE: Record<string, Attribute> = {
  CATEGORY_SELECT: { id: 'category-caption' },
  DISTANCE_SELECT: { id: 'distance-caption' },
  NAME_INPUT: { id: 'name-caption' },
  LINK_INPUT: { id: 'link-caption', className: 'help-text' },
};

export {
  FILTER_ATTRIBUTE,
  FORM_ATTRIBUTE,
  TAB_BUTTON_ATTRIBUTE,
  MODAL_ATTRIBUTE,
  CAPTION_ATTRIBUTE,
};
