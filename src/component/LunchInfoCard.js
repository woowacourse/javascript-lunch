import { DOM } from "../utils/dom.js";

const LunchInfoCard = {
  create({ src, name, label, distance, description }) {
    const LunchInfoCardElement = document.createElement("li");
    LunchInfoCardElement.setAttribute("class", "restaurant");
    LunchInfoCardElement.innerHTML = `
          <div class="restaurant__category">
              <img src=${src} alt=${label} />
          </div>
          <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${name}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              <p class="restaurant__description text-body">${description}</p>
          </div>
    `;

    return LunchInfoCardElement;
  },
};

export default LunchInfoCard;
