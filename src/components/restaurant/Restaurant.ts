import { Irestaurant } from "../../types";
import { template } from "./template";

function Restaurant() {
  const render = (restaurant: Irestaurant) => {
    const listTemplate = template(restaurant);

    return listTemplate;
  };

  return {
    render,
  };
}

export default Restaurant;
