import { IMAGE } from '../../assets/assets';
import Restaurant from '../../interfaces/Restaurant';
import Category from '../../enums/Category';

const RestaurantItem = {
  create(restaurant: Restaurant, restaurantList: HTMLUListElement) {
    const restaurantItem = document.createElement('li');
    restaurantItem.classList.add('restaurant');
    restaurantItem.appendChild(this.createRestaurantCategorySection(restaurant.category));
    restaurantItem.appendChild(this.createRestaurantInfo(restaurant));

    restaurantList.appendChild(restaurantItem);
  },

  createRestaurantCategorySection(category: Category) {
    const restaurantCategorySection = document.createElement('div');
    restaurantCategorySection.classList.add('restaurant__category');

    const restaurantCategoryImg = document.createElement('img');
    restaurantCategoryImg.src = IMAGE.url[`${category}`];
    restaurantCategoryImg.alt = '한식';
    restaurantCategoryImg.classList.add('category-icon');

    restaurantCategorySection.appendChild(restaurantCategoryImg);
    return restaurantCategorySection;
  },

  createRestaurantInfo(restaurant: Restaurant) {
    const restaurantInfo = document.createElement('div');
    restaurantInfo.classList.add('restaurant__info');

    const restaurantName = document.createElement('h3');
    restaurantName.classList.add('restaurant__name');
    restaurantName.classList.add('text-subtitle');
    restaurantName.textContent = restaurant.name;

    const restaurantDistance = document.createElement('span');
    restaurantDistance.classList.add('restaurant__distance');
    restaurantDistance.classList.add('text-body');
    restaurantDistance.textContent = `캠퍼스로부터 ${restaurant.distance}분 내`;

    const restaurantDescription = document.createElement('p');
    restaurantDescription.classList.add('restaurant__description');
    restaurantDescription.classList.add('text-body');
    restaurantDescription.textContent = restaurant.description;

    restaurantInfo.appendChild(restaurantName);
    restaurantInfo.appendChild(restaurantDistance);
    restaurantInfo.appendChild(restaurantDescription);

    return restaurantInfo;
  },

  // TODO: 이벤트 추가
};

export default RestaurantItem;
