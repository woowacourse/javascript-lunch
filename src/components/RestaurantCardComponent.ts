import { RestaurantInfo } from '../types/types';
import { CategoryIconComponent } from './CategoryIconComponent';

export function RestaurantCardComponent() {
  const categoryIconComponent = CategoryIconComponent();

  const getTemplate = ({ category, name, distance, description }: RestaurantInfo) => {
    const template = document.createElement('template');
    template.innerHTML = `
    <li class="restaurant">
    <div class="restaurant__category">
     ${categoryIconComponent.getTemplate(category)}
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
  </li>
  `;
    const node = template.content.cloneNode(true);

    return node;
  };

  const setEvent = () => {
    // // GNB 컴포넌트 이벤트 설정
    // const $button = $('.gnb__button') as Element;
    // $button.addEventListener('click', buttonComponent.handleClick);
  };

  return {
    getTemplate,
    setEvent
  };
}
