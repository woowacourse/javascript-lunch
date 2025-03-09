import toElement from "../utils/toElement.js";

function LunchInfoCard({ src, name, label, distance, description }) {
  return toElement(
    `
        <li class="restaurant">
          <div class="restaurant__category">
              <img src=${src} alt=${label} />
          </div>
          <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${name}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>
`
  );
}

export default LunchInfoCard;
