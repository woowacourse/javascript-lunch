import $template from './index.html';

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
