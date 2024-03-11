import ICON from '../../icons';

export default class Restaurant {
  render({ category, name, walkingTimeFromCampus, description }) {
    return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="${ICON[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${walkingTimeFromCampus}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    </li>
    `;
  }
}
