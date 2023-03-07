import { CATEGORIES, DISTANCES } from './formCondition';
import { SelectBoxConfig } from '../types';

export const FILTER_CATEGORY_SELECTBOX_CONFIG: SelectBoxConfig = {
  attribute: {
    name: 'category',
    id: 'category-filter',
    class: 'restaurant-filter',
    isRequired: false,
  },

  firstOption: {
    value: '전체',
    text: '전체',
  },

  options: CATEGORIES,
  optionText: '',
};

export const FORM_CATEGORY_SELECTBOX_CONFIG: SelectBoxConfig = {
  attribute: {
    name: 'category',
    id: 'category',
    class: '',
    isRequired: true,
  },

  firstOption: {
    value: '',
    text: '선택해 주세요',
  },

  options: CATEGORIES,
  optionText: '',
};

export const FORM_DISTANCE_SELECTBOX_CONFIG: SelectBoxConfig = {
  attribute: {
    name: 'distance',
    id: 'distance',
    class: '',
    isRequired: true,
  },

  firstOption: {
    value: '',
    text: '선택해 주세요',
  },

  options: DISTANCES,
  optionText: '분 내',
};
