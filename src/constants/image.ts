import type { Category } from "../types/restaurant";
import categoryKoreanImage from "../../templates/category-korean.png";
import categoryAsianImage from "../../templates/category-asian.png";
import categoryChineseImage from "../../templates/category-chinese.png";
import categoryJapaneseImage from "../../templates/category-japanese.png";
import categoryWesternImage from "../../templates/category-western.png";
import categoryEtcImage from "../../templates/category-etc.png";

const categoryImages = {
  한식: categoryKoreanImage,
  중식: categoryChineseImage,
  일식: categoryJapaneseImage,
  아시안: categoryAsianImage,
  양식: categoryWesternImage,
  기타: categoryEtcImage,
};

export const getCategoryImage = (category: Category) =>
  categoryImages[category] ?? categoryImages["기타"];
