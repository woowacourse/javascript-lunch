import { HeaderComponent } from "./component/HeaderComponent.js";

addEventListener("load", () => {
  const body = document.querySelector("body");
  body.appendChild(HeaderComponent({ title: "점심 뭐 먹지?" }));
});
