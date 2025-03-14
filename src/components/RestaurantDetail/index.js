import createElement from "../../utils/createElement/createElement";
import ButtonContainer from "./ButtonContainer";

const RestaurantDetail = (restaurant) => {
  const { name, distance, description } = restaurant.value;

  //TODO: 기존 컴포넌트로 고침
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
      ButtonContainer(),
    ],
  });
};

export default RestaurantDetail;
