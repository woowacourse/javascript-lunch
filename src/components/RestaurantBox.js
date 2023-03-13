import RestaurantList from '../domain/RestaurantList.ts';
import { $, shortenString } from '../utils';

class RestaurantBox extends HTMLElement {
  favoriteClickEvent({ name }) {
    this.shadowRoot
      .querySelector('favorite-image')
      .addEventListener('click', (event) => {
        event.stopPropagation();
        RestaurantList.updateFavorite(name);
        $('restaurant-boxes').drawRestaurants();
      });
  }

  showDetailEvent({ name, category, distance, description, link, isFavorite }) {
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

  render({ name, category, distance, description = '', isFavorite = '' }) {
    const NAME_SLICE_NUMBER = 14;
    const DESCRIPTION_SLICE_NUMBER = 30;

    this.shadowRoot.innerHTML = `
    <li >
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
        width:100%;
        padding: 16px 8px;
        border-bottom: 1px solid #e9eaed;
        cursor:pointer;
        transition: background-color 0.3s;
      }

      li:hover {
        background-color: var(--lighten-30-color);
      }
      

      .info {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
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

  update(restaurant) {
    this.attachShadow({ mode: 'open' });
    this.setAttribute('id', restaurant.name);
    this.render(restaurant);
    this.setComponentStyle();
    this.showDetailEvent(restaurant);
    this.favoriteClickEvent(restaurant);
  }
}

export default RestaurantBox;
