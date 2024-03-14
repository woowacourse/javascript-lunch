import {
  likeImgTemplate,
  unlikeImgTemplate,
} from "../components/restaurant/restaurantInfoTemplate";

import convertHTMLStringToDOM from "./convertHTMLStringToDOM";

const replaceLikeImg = (likeButton: Element, likeButtonImage: Element) => {
  likeButtonImage?.remove();
  if (likeButtonImage?.classList.contains("liked")) {
    return likeButton?.appendChild(convertHTMLStringToDOM(unlikeImgTemplate));
  }
  return likeButton?.appendChild(convertHTMLStringToDOM(likeImgTemplate));
};
export default replaceLikeImg;
