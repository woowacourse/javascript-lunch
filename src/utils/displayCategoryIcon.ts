import koreanCategoryIcon from '../assets/category-korean.png';
import japaneseCategoryIcon from '../assets/category-japanese.png';
import chineseCategoryIcon from '../assets/category-chinese.png';
import asianCategoryIcon from '../assets/category-asian.png';
import westernCategoryIcon from '../assets/category-western.png';
import etcCategoryIcon from '../assets/category-etc.png';

const displayCategoryIcon = (category: string | null): string => {
  switch (category) {
    case '한식':
      return `<img src=${koreanCategoryIcon} alt="한식" class="category-icon" />`;
    case '중식':
      return `<img src=${chineseCategoryIcon} alt="중식" class="category-icon" />`;
    case '일식':
      return `<img src=${japaneseCategoryIcon} alt="일식" class="category-icon" />`;
    case '양식':
      return `<img src=${westernCategoryIcon} alt="양식" class="category-icon" />`;
    case '아시안':
      return `<img src=${asianCategoryIcon} alt="아시안" class="category-icon" />`;
    case '기타':
      return `<img src=${etcCategoryIcon} alt="기타" class="category-icon" />`;
    default:
      return '';
  }
};

export default displayCategoryIcon;
