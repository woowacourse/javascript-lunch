import $header from "./components/header";
import $restaurantItem from "./components/restaurant-item.js";
import $input from "./components/input.js";
import { HEADER_INFO } from "./constants/component.js";
import { restaurantData } from "./data/restaurant.js";

addEventListener('load', () => {
  const body = document.body;
  
  body.prepend($header(HEADER_INFO));
  const restaurantList = document.querySelector('.restaurant-list');
  restaurantData.forEach((data) => {
    restaurantList.appendChild($restaurantItem(data));
  });

  body.appendChild($input('nameInput'));
  body.appendChild($input('linkInput'));
});