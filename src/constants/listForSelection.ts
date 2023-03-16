import { elementValue } from '../components/templates/select';
import { Category, Order } from './enum';

export const categorySelectionList: elementValue[] = [
  ['', '선택해 주세요'],
  ['한식', '한식'],
  ['중식', '중식'],
  ['일식', '일식'],
  ['양식', '양식'],
  ['아시안', '아시안'],
  ['기타', '기타'],
];

export const distanceSelectionList: elementValue[] = [
  ['', '선택해 주세요'],
  ['5', '5분 내'],
  ['10', '10분 내'],
  ['15', '15분 내'],
  ['20', '20분 내'],
  ['30', '30분 내'],
];

export const categorySelectionsList: elementValue[] = [
  [Category.All, Category.All],
  [Category.Korean, Category.Korean],
  [Category.Chinese, Category.Chinese],
  [Category.Japanese, Category.Japanese],
  [Category.Western, Category.Western],
  [Category.Asian, Category.Asian],
  [Category.Etc, Category.Etc],
];

export const orderSelectionsList: elementValue[] = [
  [Order.Name, Order.Name],
  [Order.Distance, Order.Distance],
];
