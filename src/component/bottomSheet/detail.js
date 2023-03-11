import { CATEGORY_IMAGE_URL } from '../../constants';
import button from '../common/button';
import favoriteIcon from '../common/favoriteIcon';

const detail = ({ restaurant }) => {
  const { id, category, name, takeMinute, description, link, favorite } = restaurant;
  return `
    <div data-id="${id}" class="detail">
      ${favoriteIcon({ id, favorite })}
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE_URL[category] ?? ''}" alt="${category}" class="category-icon">
      </div>
      <h2 class="restaurant__name text-subtitle">${name}</h2>
      <p class="restaurant__take-minute text-body">캠퍼스부터 ${takeMinute}분 내</p>
      <textarea readonly>${description}</textarea>
      <div class="link-area">
        <a href="${link}"></a>
      </div>
      <div class="button-container">
        ${button({ id: 'remove', type: 'button', style: 'secondary', content: '삭제하기' })}
        ${button({ id: 'close', type: 'button', style: 'primary', content: '닫기' })}
      </div>
    </div>
  `;
};

export default detail;
