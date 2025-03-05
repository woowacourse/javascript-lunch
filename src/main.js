import Restaurant from "./model/Restaurant";
import { $ } from "./utils/dom";
import { getInfo } from "./view/input";
import { FOOD_CATEGORY } from "./constants/foodCategory";
import { WALK_TIME_MINUTES } from "./constants/walkTimeMinutes";
import header from "./components/header";
import restaurantCard from "./components/restaurantCard";

const mockRestaurants = [
  new Restaurant({
    category: "한식",
    name: "피양콩할마니",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: "중식",
    name: "친친",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: "일식",
    name: "잇쇼우",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: "일식",
    name: "잇쇼우",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: "일식",
    name: "잇쇼우",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: "일식",
    name: "잇쇼우",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: "일식",
    name: "잇쇼우",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: "일식",
    name: "잇쇼우",
    distance: WALK_TIME_MINUTES[0],
    description: "설명입니다",
    link: "http//localhost:30000",
  }),
  new Restaurant({
    category: "일식",
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
  console.log(restaurant);
  // 생성된 객체를 list에 넣기
  restaurantList.push(restaurant);
  //모달창 닫기기
  $(".modal").classList.remove("modal--open");
  //화면에 추가된 리스트를 렌더링
  renderRestaurants(restaurantList);
});

const renderRestaurants = (restaurantList) => {
  const ulTag = $(".restaurant-list");
  restaurantList.forEach((restaurant) => {
    ulTag.appendChild(restaurantCard(restaurant));
  });
};

addEventListener("load", () => {
  $("#app").prepend(header());
  renderRestaurants(restaurantList);
});
