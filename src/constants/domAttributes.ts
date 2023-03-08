import { Attribute } from '../types/types';

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

export { FILTER_ATTRIBUTE, FORM_ATTRIBUTE };
