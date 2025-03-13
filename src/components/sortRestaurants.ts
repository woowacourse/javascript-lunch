import { Restaurant } from "../../types/global";

const sortByOption = (restaurants: Restaurant[], sortOption: string) => {
  if (sortOption === "name") {
    return restaurants.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortOption === "distance") {
    return restaurants.sort((a, b) => a.distance - b.distance);
  }
};

export default sortByOption;
