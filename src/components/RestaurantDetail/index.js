import createElement from "../../utils/createElement/createElement";
import FavoriteIcon from "../RestaurantCard/FavoriteIcon";
import RestaurantDetailButtonContainer from "./RestaurantDetailButtonContainer";

const RestaurantDetail = (restaurant, events = {}) => {
  const { name, distance, description } = restaurant.value;
  const { clickDelete, clickFavorite } = events;

  //TODO: 기존 컴포넌트로 고치기
  return createElement({
    tagName: "div",
    classNames: ["restaurant__info"],
    children: [
      createElement({
        tagName: "h2",
        classNames: ["restaurant__name"],
        text: name,
      }),
      createElement({
        tagName: "p",
        classNames: ["restaurant__distance"],
        text: distance,
      }),
      createElement({
        tagName: "p",
        classNames: ["restaurant__description"],
        text: description,
      }),
      FavoriteIcon(restaurant, clickFavorite),
      RestaurantDetailButtonContainer(restaurant, clickDelete),
    ],
  });
};

export default RestaurantDetail;
