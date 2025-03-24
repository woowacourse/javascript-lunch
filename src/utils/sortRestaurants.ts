import { Restaurant } from "../../types/global";

const sortByOption = (restaurants: Restaurant[], sortOption: string) => {
  if (sortOption === "name") {
    return restaurants.sort((a: Restaurant, b: Restaurant) =>
      a.name.localeCompare(b.name),
    );
  }
  if (sortOption === "distance") {
    return restaurants.sort(
      (a: Restaurant, b: Restaurant) => a.distance - b.distance,
    );
  }
};

export default sortByOption;
