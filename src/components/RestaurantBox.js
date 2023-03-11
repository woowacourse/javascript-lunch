import { $, shortenString } from '../utils';
import RestaurantList from '../domain/RestaurantList.ts';

class RestaurantBox extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.showDetailEvent();
    this.favoriteClickEvent();
  }

  favoriteClickEvent() {
    this.shadowRoot
      .querySelector('favorite-image')
      .addEventListener('click', (event) => {
        event.stopPropagation();
        const name = this.getAttribute('name');
        RestaurantList.updateFavorite(name);
        $('restaurant-boxes').drawRestaurants();
      });
  }

  showDetailEvent() {
    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description') || '';
    const link = this.getAttribute('link') || '';
    const isFavorite = this.getAttribute('isFavorite');

    this.shadowRoot.querySelector('li').addEventListener('click', () => {
      $('restaurant-detail-modal').openModal();
      $('restaurant-detail-modal').renderDetailRestaurant({
        name,
        category,
        distance,
        description,
        link,
        isFavorite,
      });
    });
  }

  static get observedAttributes() {
    return [
      'category',
      'name',
      'distance',
      'description',
      'link',
      'isFavorite',
    ];
  }

  render() {
    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description') || '';
    const isFavorite = this.getAttribute('isFavorite');

    const NAME_SLICE_NUMBER = 15;
    const DESCRIPTION_SLICE_NUMBER = 30;

    this.shadowRoot.innerHTML = `
    <li>
      <category-image category=${category}></category-image>
      <div class="info">
        <div class="item-wrapper">
          <div class="name-container">
            <h3 class="name text-subtitle">${shortenString(
              name,
              NAME_SLICE_NUMBER
            )}</h3>
            <span class="distance text-body">캠퍼스부터 ${distance}분 내</span>
          </div>
          <favorite-image isFavorite="${isFavorite}"></favorite-image>
        </div>
        <span class="description text-body">${shortenString(
          description,
          DESCRIPTION_SLICE_NUMBER
        )}</span>
      </div>
    </li>
    `;
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .text-subtitle {
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
      }
      
      .text-body {
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
      }
      
      li {
        display: flex;
        align-items: flex-start;
      
        padding: 16px 8px;
        width:100%;
      
        border-bottom: 1px solid #e9eaed;
        cursor:pointer;
      }
      

      .info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width:100%;
      }
      
      .name {
        margin: 0;
      }
      
      .distance {
        color: var(--primary-color);
      }
      
      .description {
        display: -webkit-box;

      
        padding-top: 8px;
      
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow-wrap: break-word;
      }

      .item-wrapper{
        display:flex;
        justify-content:space-between;
      }

      @media (max-height: 900px) {
        li {
          padding: 8px 4px;
        }
      }
`;

    this.shadowRoot.append(componentStyle);
  }
}

export default RestaurantBox;
