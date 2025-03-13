import createElement from "../../utils/createElement/createElement";
import Image from "../common/Image";

const FavoriteIcon = () =>
  createElement({
    tagName: "div",
    classNames: ["restaurant__favorite"],
    children: [
      Image({
        src: "./public/favorite-icon-lined.png",
        alt: "favorite-icon",
        classNames: ["favorite-icon"],
      }),
    ],
  });

export default FavoriteIcon;
