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

export { FILTER_ATTRIBUTE };
