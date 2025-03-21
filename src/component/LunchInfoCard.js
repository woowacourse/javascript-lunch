import DetailModalContent from "./DetailModal/DetailModalContent.js";
import Modal from "./Modal.js";

const LunchInfoCard = {
  create({ id, src, name, label, distance, description, favorite, link }) {
    const LunchInfoCardElement = document.createElement("li");
    LunchInfoCardElement.setAttribute("class", "restaurant");
    LunchInfoCardElement.innerHTML = /*html*/ `
      <img id=${id} class="restaurant__favorite" src=${
      favorite ? "./favorite-icon-filled.png" : "./favorite-icon-lined.png"
    } alt=${favorite ? "favoriteIcon" : "noFavoriteIcon"} />
      <div class="restaurant__category">
          <img src=${src} alt=${label} />
      </div>
      <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
      </div>
    `;

    LunchInfoCardElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("restaurant__favorite")) return;

      Modal.open("detail");
      DetailModalContent.set({
        id,
        src,
        label,
        name,
        distance,
        description,
        link,
        favorite,
      });
      DetailModalContent.handleFavoriteButton();
    });

    return LunchInfoCardElement;
  },
};

export default LunchInfoCard;
