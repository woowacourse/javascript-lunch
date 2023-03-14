import BottomSheet from "../components/BottomSheet";
import {
  categoryAsian,
  categoryChinese,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
  categoryEtc,
} from "../assets/";

export const closeBottomSheet = () => {
  const bottomSheet = document.getElementById("bottomSheet");
  if (!(bottomSheet instanceof BottomSheet)) {
    return;
  }
  bottomSheet.close();
};

export const openBottomSheet = (children: string) => {
  const bottomSheet = document.getElementById("bottomSheet");
  if (!(bottomSheet instanceof BottomSheet)) {
    return;
  }
  bottomSheet.open(children);
};

export const hideRestaurantFilter = () => {
  const restaurantFilter = document.getElementById("restaurantFilterContainer");
  if (!(restaurantFilter instanceof HTMLElement)) {
    return;
  }
  restaurantFilter.style.display = "none";
};

export const showRestaurantFilter = () => {
  const restaurantFilter = document.getElementById("restaurantFilterContainer");
  if (!(restaurantFilter instanceof HTMLElement)) {
    return;
  }
  restaurantFilter.style.display = "";
};

export const findImage = (category: string) => {
  const imageSrc: { [key: string]: string } = {
    한식: categoryKorean,
    중식: categoryChinese,
    일식: categoryJapanese,
    양식: categoryWestern,
    아시안: categoryAsian,
    기타: categoryEtc,
  };
  return imageSrc[category];
};
