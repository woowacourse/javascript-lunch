interface LunchRestaurantTypeIconProps {
  imgSrc: string;
  alt: string;
}

class LunchRestaurantTypeIcon extends HTMLDivElement {
  constructor(props: LunchRestaurantTypeIconProps) {
    super();
    this.className = 'restaurant__category';
    this.insertAdjacentHTML('beforeend', this.createImgHTML(props));
  }

  createImgHTML(props: LunchRestaurantTypeIconProps) {
    return `<img src=${props.imgSrc} alt=${props.alt} class="category-icon">`;
  }
}

customElements.define('lunch-restaurant-type-icon', LunchRestaurantTypeIcon, { extends: 'div' });

export default LunchRestaurantTypeIcon;
