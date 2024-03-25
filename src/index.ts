import "../src/view/style.css";
import "./image/add-button.png";

import MainController from "./controller/MainController";

const mainController = new MainController();

const body = document.querySelector("body");

const titleElement = document.querySelector(".gnb__title") as HTMLElement;
const addButtonElement = document.getElementById(
  "add-restaurant-button"
) as HTMLButtonElement;

body?.append(mainController.element);

mainController.attachEventToHeader(titleElement, addButtonElement);
