import $header from "./components/header";
import $restaurantItem from "./components/restaurant-item.js";
import $input from "./components/input.js";
import $select from "./components/select.js";
import $textarea from "./components/textarea.js";
import { ADD_BUTTON, CANCEL_BUTTON, HEADER_INFO } from "./constants/component.js";
import { restaurantData } from "./data/restaurant.js";
import { categoryOptions,distanceOptions } from "./data/selectOptions.js";
import $inputItem from "./components/input-item.js";
import $form from "./components/form.js";
import $modal from "./components/modal.js";
import $button from "./components/button.js";
import $buttonContainer from "./components/button-container.js";

const handleModalOpen = () => {
  document.querySelector(".modal").classList.add("modal--open");
};

addEventListener('load', () => {
  const body = document.body;
  
  body.prepend($header(HEADER_INFO));
  
  const restaurantList = document.querySelector('.restaurant-list');
  restaurantData.forEach((data) => {
    restaurantList.appendChild($restaurantItem(data));
  });

  const submitCancelButtons = $buttonContainer([$button(CANCEL_BUTTON), $button(ADD_BUTTON)]);

  const restaurantAddForm = [
    $inputItem("categorySelect"),
    $inputItem("nameInput"),
    $inputItem("distanceSelect"),
    $inputItem("descriptionTextarea"),
    $inputItem("linkInput"),
    submitCancelButtons
  ];
  
  document.getElementsByTagName("main")[0].appendChild($modal(restaurantAddForm));
  
  document.querySelector(".gnb__button").addEventListener("click", handleModalOpen);

  // body.append($modal());
  // body.appendChild($form(restaurantAddForm));
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