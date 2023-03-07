import {
  categoryAsian,
  categoryChinese,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
  categoryEtc,
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
  };
  return imageSrc[category];
};

export default findImage;
