import RestaurantHeader from "./RestaurantHeader.js";

export default function Restaurant() {
  const $body = document.querySelector("body");
  const $RestaurantHeader = RestaurantHeader("점심 뭐 먹지");
  $body.prepend($RestaurantHeader);
}
