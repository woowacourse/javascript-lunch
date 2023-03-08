import type { Category } from "../types/restaurant";

import categoryKoreanImage from "../images/category/category-korean.png";
import categoryAsianImage from "../images/category/category-asian.png";
import categoryChineseImage from "../images/category/category-chinese.png";
import categoryJapaneseImage from "../images/category/category-japanese.png";
import categoryWesternImage from "../images/category/category-western.png";
import categoryEtcImage from "../images/category/category-etc.png";

const categoryImages: Record<Category, string> = {
  한식: categoryKoreanImage,
  중식: categoryChineseImage,
  일식: categoryJapaneseImage,
  아시안: categoryAsianImage,
  양식: categoryWesternImage,
  기타: categoryEtcImage,
};

export default categoryImages;
