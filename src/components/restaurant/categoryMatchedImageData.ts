import asianCategoryImage from '../../../templates/category-asian.png';
import chinesecategoryImage from '../../../templates/category-chinese.png';
import etcCategoryImage from '../../../templates/category-etc.png';
import japaneseCategoryImage from '../../../templates/category-japanese.png';
import koreanCategoryImage from '../../../templates/category-korean.png';
import westernCategoryImage from '../../../templates/category-western.png';

const categoryMatchedImageData = [
  {
    category: '한식',
    categoryImg: koreanCategoryImage,
  },
  {
    category: '중식',
    categoryImg: chinesecategoryImage,
  },
  {
    category: '일식',
    categoryImg: japaneseCategoryImage,
  },
  {
    category: '양식',
    categoryImg: westernCategoryImage,
  },
  {
    category: '아시안',
    categoryImg: asianCategoryImage,
  },
  {
    category: '기타',
    categoryImg: etcCategoryImage,
  },
];

export default categoryMatchedImageData;
