// import RestaurantList from "./domain/RestaurantList";
// import View from "./view";
// import {
//   getRestaurantsFromLocalStorage,
//   setRestaurantsToLocalStorage,
// } from "./util";

// (function initRestaurants() {
//   if (getRestaurantsFromLocalStorage().length !== 0) {
//     return;
//   }

//   setRestaurantsToLocalStorage([
//     {
//       category: "한식",
//       name: "우리김밥",
//       distance: 5,
//     },
//     {
//       category: "일식",
//       name: "너네초밥",
//       distance: 30,
//       description: "정말 맛있는 너네집 초밥!",
//     },
//     {
//       category: "중식",
//       name: "친친",
//       distance: 10,
//       link: "https://map.naver.com",
//     },
//     {
//       category: "아시안",
//       name: "김밥천국",
//       distance: 15,
//       description: "원조 김밥 맛집!",
//       link: "http://map.naver.com",
//     },
//     {
//       category: "한식",
//       name: "비벼비벼비빔밥",
//       distance: 20,
//     },
//   ]);
// })();

// const restaurantList = new RestaurantList(getRestaurantsFromLocalStorage());

// window.addEventListener("unload", () => {
//   setRestaurantsToLocalStorage(
//     restaurantList.getRestaurants({ category: "전체", sortingStandard: "name" })
//   );
// });

// new View(document.querySelector("body") as HTMLBodyElement, restaurantList);
