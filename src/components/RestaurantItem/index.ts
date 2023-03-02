import $template from './index.html';

type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type Distance = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = $template;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = $template
      .replace('{category}', this.getAttribute('category')!)
      .replace('{name}', this.getAttribute('name')!)
      .replace('{distance}', this.getAttribute('distance')!)
      .replace('{description}', this.getAttribute('description')!);
  }
}

export default RestaurantItem;
