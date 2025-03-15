import { IconButton } from "./component/button/IconButton.js";
import { Modal } from "./component/layout/Modal.js";
import { Filter } from "./domain/Filter.js";
import { FoodListPage } from "./pages/FoodListPage.js";
import { Module } from "./Module.js";

addEventListener("load", () => {
  const AddFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    onClick: () => {},
  });

  const filter = new Filter();

  const foodListPage = new FoodListPage({
    title: "점심 뭐 먹지",
    iconButton: AddFoodItemIcon,
  });

  Modal.setDefaultModal();
  const module = new Module(filter);
  module.init();
});
