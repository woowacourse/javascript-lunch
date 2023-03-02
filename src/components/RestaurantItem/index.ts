import restaurantItem from './index.html';

type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type Distance = 5 | 10 | 15 | 20 | 30;

interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = restaurantItem;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const $category = document.querySelector('.restaurant__category') as HTMLElement;
    const $name = document.querySelector('.restaurant__name') as HTMLElement;
    const $distance = document.querySelector('.restaurant__distance') as HTMLElement;
    const $description = document.querySelector('.restaurant__description') as HTMLElement;

    const category = this.getAttribute('category');
    const name = this.getAttribute('name');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description');

    $category.textContent = category;
    $name.textContent = name;
    $distance.textContent = distance;
    $description.textContent = description;
  }
}

export default RestaurantItem;
