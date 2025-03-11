import createElement from "../../utils/createElement/createElement";
import Title from "../common/title";
import Description from "./description";
import Distance from "./distance";

const RestaurantInfo = ({ name, distance, description }) =>
  createElement({
    tagName: "div",
    classNames: ["restaurant__info"],
    children: [
      Title(name, "h3", "restaurant__name", "text-subtitle"),
      Distance(distance),
      Description(description, true),
    ],
  });

export default RestaurantInfo;
