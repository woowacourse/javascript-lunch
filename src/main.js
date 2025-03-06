import $header from "./components/header";
import $restaurantItem from "./components/restaurant-item.js";
import $input from "./components/input.js";
import $select from "./components/select.js";
import $textarea from "./components/textarea.js";
import { HEADER_INFO } from "./constants/component.js";
import { restaurantData } from "./data/restaurant.js";
import { categoryOptions,distanceOptions } from "./data/selectOptions.js";
import $inputItem from "./components/input-item.js";

addEventListener('load', () => {
  const body = document.body;
  
  body.prepend($header(HEADER_INFO));
  const restaurantList = document.querySelector('.restaurant-list');
  restaurantData.forEach((data) => {
    restaurantList.appendChild($restaurantItem(data));
  });

  // body.appendChild($input('nameInput'));
  // body.appendChild($input('linkInput'));
  // body.appendChild($select(categoryOptions,'categorySelect'));
  // body.appendChild($select(distanceOptions,'distanceSelect'));

  
  // body.appendChild($textarea('descriptionTextarea'));
  // body.appendChild($inputItem('categorySelect'));
  // body.appendChild($inputItem('nameInput'));
  // body.appendChild($inputItem('distanceSelect'));
  // body.appendChild($inputItem('descriptionTextarea'));
  // body.appendChild($inputItem('linkInput'));
});