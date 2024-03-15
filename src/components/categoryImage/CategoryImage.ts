import { CategoryType } from "../../types";
import {
  CategoryAsian,
  CategoryChinese,
  CategoryEtc,
  CategoryJapanese,
  CategoryKorean,
  CategoryWestern,
} from '../../asset/img/index';

const CATEGORY_IMAGE: Record<CategoryType, string> = {
  한식: CategoryKorean,
  중식: CategoryChinese,
  일식: CategoryJapanese,
  양식: CategoryWestern,
  아시안: CategoryAsian,
  기타: CategoryEtc,
  전체: '',
};

class CategoryImage extends HTMLDivElement {
  constructor(category: CategoryType) {
    super();
    this.className = 'restaurant__category';
    this.createRestaurantCategory(category);
  }

  createRestaurantCategory(category: CategoryType) {
    const img = document.createElement('img');
    img.setAttribute('src', CATEGORY_IMAGE[category]);
    img.setAttribute('alt', category);
    img.className = 'category-icon';
    this.appendChild(img);
  }
}

customElements.define('matzip-category-image', CategoryImage, {extends: 'div'});

export default CategoryImage;

