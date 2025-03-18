import { RESTAURANT_LIST_KEY } from "../../constants/constants.js";
import state from "../../state.js";
import LocalStorage from "../../utils/LocalStorage.ts";
import { $ } from "../../utils/querySelectors.js";
import Renderer from "../../utils/Renderer.js";
import RestaurantListUtils from "../../utils/RestaurantListUtils.js";
import FilterSelect from "../FilterSelect.js";
import Modal from "../Modal.js";
import RestaurantList from "../RestaurantList.js";
import DetailModalButtonContainer from "./DetailModalButtonContainer.js";

const DetailModalContent = {
  create() {
    const DetailModalContent = document.createElement("div");
    const DetailModalList = document.createElement("li");
    DetailModalList.setAttribute("class", "restaurant-detail");
    DetailModalContent.appendChild(DetailModalList);
    DetailModalContent.appendChild(DetailModalButtonContainer.create());

    return DetailModalContent;
  },

  set({ id, favorite, src, label, name, distance, description, link }) {
    $(".restaurant-detail").innerHTML = /*html*/ `
    <img id=${id} class="restaurant__favorite" src=${
      favorite ? "./favorite-icon-filled.png" : "./favorite-icon-lined.png"
    } alt=${favorite ? "favoriteIcon" : "noFavoriteIcon"} />
    <div class="restaurant__category">
        <img src=${src} alt=${label} />
    </div>
    <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description-detail text-body">${description}</p>
        <p class="restaurant__link text-body">${link ? link : ""}</p>
    </div>
  `;
    this.handleFavoriteButton();
  },

  handleFavoriteButton() {
    $(".restaurant-detail .restaurant__favorite").addEventListener(
      "click",
      (e) => {
        const id = e.target.id;
        const alt = e.target.alt;

        this.changeIcon(e.target);

        const favoriteList = RestaurantListUtils.favoriteById(
          LocalStorage.getJSON(RESTAURANT_LIST_KEY),
          Number(e.target.id)
        );
        LocalStorage.setJSON(RESTAURANT_LIST_KEY, favoriteList);
        Renderer.renderOuter();
      }
    );
  },

  changeIcon(target) {
    const alt = target.alt;

    if (alt == "favoriteIcon") {
      target.alt = "noFavoriteIcon";
      target.src = "./favorite-icon-lined.png";
    }
    if (alt == "noFavoriteIcon") {
      target.alt = "favoriteIcon";
      target.src = "./favorite-icon-filled.png";
    }
  },
};

export default DetailModalContent;
