import asianCategoryImage from "../../../templates/category-asian.png";
import chinesecategoryImage from "../../../templates/category-chinese.png";
import etcCategoryImage from "../../../templates/category-etc.png";
import japaneseCategoryImage from "../../../templates/category-japanese.png";
import koreanCategoryImage from "../../../templates/category-korean.png";
import westernCategoryImage from "../../../templates/category-western.png";
import { CATEGORIES } from "../../constants/system";

const categoryMatchedImageData = [
  {
    category: CATEGORIES.KOREAN,
    categoryImg: koreanCategoryImage,
  },
  {
    category: CATEGORIES.CHINESE,
    categoryImg: chinesecategoryImage,
  },
  {
    category: CATEGORIES.JAPANESE,
    categoryImg: japaneseCategoryImage,
  },
  {
    category: CATEGORIES.WESTERN,
    categoryImg: westernCategoryImage,
  },
  {
    category: CATEGORIES.ASIAN,
    categoryImg: asianCategoryImage,
  },
  {
    category: CATEGORIES.OTHER,
    categoryImg: etcCategoryImage,
  },
];

export default categoryMatchedImageData;
