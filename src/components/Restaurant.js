import korean from '../../templates/category-korean.png';
import chinese from '../../templates/category-chinese.png';
import japanese from '../../templates/category-japanese.png';
import western from '../../templates/category-western.png';
import asian from '../../templates/category-asian.png';
import etc from '../../templates/category-etc.png';

const CATEGORY_TRANSLATION = {
  한식: korean,
  중식: chinese,
  일식: japanese,
  양식: western,
  아시안: asian,
  기타: etc,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const RestaurantComponent = information => {
  return `<li class="restaurant">
    <div class="restaurant__category">
    
      <img src=${CATEGORY_TRANSLATION[information.category]} alt=${information.category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${information.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${information.distance}분 내</span>
      <p class="restaurant__description text-body">${information.description}</p>
    </div>
    </li>`;
};

export default RestaurantComponent;
