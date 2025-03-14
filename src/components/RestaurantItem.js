import { IMAGE, FAV_STAR } from '../constants/constants.ts';
import createFavoriteStar from './FavoriteStar.js'

function createRestaurantItem({ category, name, distance, description, link }, isFavorite) {
  const favoriteStarConfig = {
    ...FAV_STAR,
    inactiveSrc: isFavorite ? FAV_STAR.activeSrc : FAV_STAR.inactiveSrc,
  };
  const item = `<li class="restaurant">
              <div class="restaurant__category">
                <img src="${IMAGE.get(category)}" alt="${category}" class="category-icon" />
              </div>
              <div class="restaurant__info">
                <div class="titleStar__box">
                  <div class="title__box">
                    <h3 class="restaurant__name text-subtitle">${name}</h3>
                    <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                  </div>
                  ${createFavoriteStar(favoriteStarConfig)}
                </div>
                <p class="restaurant__description text-body">
                  ${description}
                  </p>
                  <a href="${link}" class="restaurant__link">${link}</a>
              </div>
            </li>`;

  return item;
}

export default createRestaurantItem;
