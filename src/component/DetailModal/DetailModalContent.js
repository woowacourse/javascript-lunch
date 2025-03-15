import { $ } from "../../utils/querySelectors.js";
import LunchInfoCard from "../LunchInfoCard.js";

const DetailModalContent = {
  create() {
    const DetailModalContent = document.createElement("div");
    DetailModalContent.setAttribute("class", "restaurant-detail");

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
  },
};

export default DetailModalContent;
