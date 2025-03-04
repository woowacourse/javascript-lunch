import { FOOD_CATEGORY } from "./constants/foodCategory";
import { WALK_TIME_MINUTES } from "./constants/walkTimeMinutes";
import Restaurant from "./Restaurant";

const mockRestaurants = [
  new Restaurant({
    category: FOOD_CATEGORY[0],
    name: "피양콩할마니",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: FOOD_CATEGORY[0],
    name: "친친",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: FOOD_CATEGORY[0],
    name: "잇쇼우",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
];

const controller = () => {
  const restaurantList = [...mockRestaurants];
  const newRestaurant = createRestaurant({
    category: FOOD_CATEGORY[0],
    name: "이태리키친",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  });

  restaurantList.push(newRestaurant);
};

export default controller;
