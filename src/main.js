import { FoodItem } from "./component/FoodItem.js";
import { HeaderComponent } from "./component/HeaderComponent.js";

addEventListener("load", () => {
  const body = document.querySelector("body");
  body.appendChild(HeaderComponent({ title: "점심 뭐 먹지?" }));

  body.appendChild(
    FoodItem({
      imgSrc: "/category-japanese.png",
      imgAlt: "일식",
      name: "잇쇼우",
      distance: "10",
      description: "잇쇼우 최선을 다합니다",
    })
  );
});
