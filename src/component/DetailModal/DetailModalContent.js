import data from "../../data.js";
import state from "../../state.js";
import { $ } from "../../utils/querySelectors.js";
import RestaurantListUtils from "../../utils/RestaurantListUtils.js";
import FilterSelect from "../FilterSelect.js";
import LunchInfoCard from "../LunchInfoCard.js";
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

    this.handleDeleteButton(id);
    this.handleFavoriteButton();
  },

  handleDeleteButton(id) {
    $("#delete__button").addEventListener("click", () => {
      const deletedList = RestaurantListUtils.delete(data.restaurantList, id);
      data.restaurantList = deletedList;
      this.renderAll();
      Modal.close("detail");
    });
  },

  handleFavoriteButton() {
    $(".restaurant-detail .restaurant__favorite").addEventListener(
      "click",
      (e) => {
        const id = e.target.id;
        const alt = e.target.alt;

        this.changeIcon(e.target);

        data.restaurantList = RestaurantListUtils.favoriteById(
          data.restaurantList,
          Number(e.target.id)
        );
        state.setCurrentRestaurantList(
          RestaurantListUtils.favoriteById(
            state.currentRestaurantList,
            Number(e.target.id)
          )
        );
        this.renderAll();
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

  renderAll() {
    FilterSelect.applyFilter("allRestaurant");
    const favoriteRestaurantList = RestaurantListUtils.getFavoriteList(
      data.restaurantList
    );
    RestaurantList.applyList("favoriteRestaurant", favoriteRestaurantList);
  },
};

export default DetailModalContent;
