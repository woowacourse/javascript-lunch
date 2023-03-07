import korean from '../../assets/category-korean.png';
import chinese from '../../assets/category-chinese.png';
import japanese from '../../assets/category-japanese.png';
import western from '../../assets/category-western.png';
import asian from '../../assets/category-asian.png';
import etc from '../../assets/category-etc.png';
import { CategoryOptions } from '../types/type';
import { IRestaurant } from '../domain/Restaurant';

export default function RestaurantItemTemplate({
  category,
  distance,
  name,
  description,
}: IRestaurant) {
  return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="${categoryImageSource(
          category
        )}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description ?? ''}</p>
      </div>
    </li>`;
}

function categoryImageSource(category: CategoryOptions) {
  switch (category) {
    case '한식':
      return korean;
    case '중식':
      return chinese;
    case '일식':
      return japanese;
    case '양식':
      return western;
    case '아시안':
      return asian;
    case '기타':
      return etc;
  }
}
