import './index.css';
import categoryKorean from '../../assets/category-korean.png';
import categoryChinese from '../../assets/category-chinese.png';
import categoryJapanese from '../../assets/category-japanese.png';
import categoryWestern from '../../assets/category-western.png';
import categoryAsian from '../../assets/category-asian.png';
import categoryEtc from '../../assets/category-etc.png';

const CATEGORY_IMAGES = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapanese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

class RestaurantInfo extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description') || '';

    this.innerHTML = `
    <li class="restaurant">
        <div class="restaurant__category">
          <img src="${CATEGORY_IMAGES[category]}" alt=${category} class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
        </div>
    </li>
    `;
  }

  static get observedAttributes() {
    return ['category', 'name', 'distance', 'description'];
  }

  attributeChangedCallback(name) {
    if (name === 'category' && name === 'name' && name === 'distance') {
      this.connectedCallback();
    }
  }
}

export default RestaurantInfo;
