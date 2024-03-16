import './style.css';
import '../LunchItem/LunchItem';
import '../LunchDetailModal/LunchDetailModal';
import { RestaurantDataProvider } from '../../domain/index';

import { Category, Restaurant, Restaurants, SortBy } from '../../types/index';
import textInput from '../../utils/textInput';
import RestaurantDataUpdater from '../../domain/RestaurantDataUpdater';

export interface FilterPropsTypes {
  category?: Category;
  sortBy?: SortBy;
  liked: boolean;
}

const LUNCH_ITEMS_TEMPLATE = /* HTML */ `
  <section class="restaurant-list-container">
    <ul class="restaurant-list"></ul>
  </section>
`;

const LUNCH_ITEM_TEMPLATE = (restaurant: Restaurant) => /* HTML */ `
  <lunch-item
    category="${restaurant.category}"
    name="${restaurant.name}"
    distance="${restaurant.distance}"
    description="${restaurant.description ?? ''}"
    liked="${restaurant.liked}"
    link="${restaurant.link ?? ''}"
  ></lunch-item>
`;

// const LUNCH_DETAIL_MODAL_TEMPLATE = (restaurant: Restaurant) => /* HTML */ `
//   <lunch-detail-modal
//     category="${restaurant.category}"
//     name="${restaurant.name}"
//     distance="${restaurant.distance}"
//     description="${restaurant.description ?? ''}"
//     liked="${restaurant.liked}"
//     link="${restaurant.link}"
//   ></lunch-detail-modal>
// `;

class LunchItems extends HTMLElement {
  connectedCallback() {
    this.insertAdjacentHTML('beforeend', LUNCH_ITEMS_TEMPLATE);
    this.render();
    this.setEventListener();
  }

  render(): void {
    const liked = this.getLikedAttribute();
    this.renderItems({ liked });
  }

  renderItems({ category, sortBy, liked }: FilterPropsTypes): void {
    const itemHTMLs: string[] = [];
    this.getRestaurants({ category, sortBy, liked }).forEach((restaurant) => {
      itemHTMLs.push(LUNCH_ITEM_TEMPLATE(restaurant));
    });
    textInput.setInnerHtml.call(this, '.restaurant-list', itemHTMLs);
  }

  getRestaurants({ category, sortBy, liked }: FilterPropsTypes): Restaurants {
    return RestaurantDataProvider.execute({ category, sortBy, liked });
  }

  setEventListener() {
    this.addEventListener('clickLikedButton', (e: any) => this.handleLiked(e));
    // this.addEventListener('click', (e: any) => this.handleDetailModal(e), true);
  }

  handleLiked(e: any) {
    const name: string = e.target.getAttribute('name') ?? '';
    const liked = this.getLikedAttribute();
    RestaurantDataUpdater.updateLiked({ name });
    this.renderItems({ liked });
  }

  getLikedAttribute(): boolean {
    const likedAttribute = this.getAttribute('liked') ?? '';
    const liked = likedAttribute === 'true';
    return liked;
  }

  // handleDetailModal(e: any) {
  //   e.stopPropagation();
  //   console.log(e.target);
  // }
}

customElements.define('lunch-items', LunchItems);

export default LunchItems;
