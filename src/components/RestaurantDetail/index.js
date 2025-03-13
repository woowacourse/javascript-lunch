import createElement from "../../utils/createElement/createElement";

const RestaurantDetail = (restaurant) => {
  const { name, distance, description } = restaurant.value;

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
    ],
  });
};

export default RestaurantDetail;
