import Restaurant from "./model/Restaurant";
import { $ } from "./utils/dom";
import { getInfo } from "./view/input";
import { FOOD_CATEGORY } from "./constants/foodCategory";
import { WALK_TIME_MINUTES } from "./constants/walkTimeMinutes";

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

const restaurantList = [...mockRestaurants];
$("#register-button").addEventListener("click", (e) => {
  e.preventDefault();
  //받은 info로 restaurant 객체를 생성하고
  const restaurant = new Restaurant(getInfo());
  // 생성된 객체를 list에 넣기
  restaurantList.push(restaurant);
  console.log(restaurantList);
});
