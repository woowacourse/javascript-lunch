import addButton from './image/add-button.png';
import categoryAsian from './image/category-asian.png';
import categoryChinese from './image/category-chinese.png';
import categoryEtc from './image/category-etc.png';
import categoryJapanese from './image/category-japanese.png';
import categoryKorean from './image/category-korean.png';
import categoryWestern from './image/category-western.png';
import favoriteIconFilled from './image/favorite-icon-filled.png';
import favoriteIconLined from './image/favorite-icon-lined.png';
import { TCategory } from '../domain/RestaurantListItem';

export const Button = {
  add: addButton,
};

export const Category: Record<TCategory, string> = {
  아시안: categoryAsian,
  중식: categoryChinese,
  기타: categoryEtc,
  일식: categoryJapanese,
  한식: categoryKorean,
  양식: categoryWestern,
};

export const Favorite = {
  filled: favoriteIconFilled,
  lined: favoriteIconLined,
};
