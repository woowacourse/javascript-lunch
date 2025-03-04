import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header";

addEventListener("load", () => {
  const app = document.querySelector("#app");
  const $header = Header();

  app.insertAdjacentHTML("afterbegin", $header);
});
