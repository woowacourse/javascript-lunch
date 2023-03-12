import {
  categoryAsian,
  categoryChinese,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
  categoryEtc,
  favoriteLined,
  favoriteFilled,
} from "../assets/";

const findImage = (category: string) => {
  const imageSrc: { [key: string]: string } = {
    all: categoryEtc,
    korean: categoryKorean,
    chinese: categoryChinese,
    japanese: categoryJapanese,
    western: categoryWestern,
    asian: categoryAsian,
    etc: categoryEtc,
    favoriteFilled,
    favoriteLined,
  };
  return imageSrc[category];
};

export default findImage;
