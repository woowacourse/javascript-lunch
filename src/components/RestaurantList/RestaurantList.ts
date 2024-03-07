import BaseComponent from '../BaseComponent';
import restaurantListMock from '@/mock/restaurantList.mock';
import koreanIcon from '@/assets/category-korean.png';
import asianIcon from '@/assets/category-asian.png';
import japaneseIcon from '@/assets/category-japanese.png';
import chineseIcon from '@/assets/category-chinese.png';
import westernIcon from '@/assets/category-western.png';
import etcIcon from '@/assets/category-etc.png';
import { Category } from '@/types/Restaurant';
import RestaurantItem from '../RestaurantItem/RestaurantItem';

const Icons: { [key: Category]: string } = {
  한식: koreanIcon,
  아시안: asianIcon,
  일식: japaneseIcon,
  중식: chineseIcon,
  양식: westernIcon,
  기타: etcIcon,
};

class RestaurantList extends BaseComponent {
  render() {
    const restaurantList = this.#makeRestaurantList();
    this.append(restaurantList);
  }

  #makeRestaurantList() {
    const restaurantList = restaurantListMock.map((restaurant) => new RestaurantItem(restaurant));

    const ulTag = document.createElement('ul');
    ulTag.classList.add('restaurant-list');
    restaurantList.forEach((restaurant) => {
      ulTag.append(restaurant);
    });
    return ulTag;
  }
}

customElements.define('restaurant-list', RestaurantList);
