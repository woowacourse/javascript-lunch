import {
  categoryAsian,
  categoryChinese,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
  categoryEtc,
} from "../assets/";

const findImage = (category: string) => {
  switch (category) {
    case "한식":
      return categoryKorean;
    case "중식":
      return categoryChinese;
    case "일식":
      return categoryJapanese;
    case "양식":
      return categoryWestern;
    case "아시안":
      return categoryAsian;
    case "기타":
      return categoryEtc;
    default:
      return categoryEtc;
  }
};

export default findImage;
