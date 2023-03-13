import RestaurantList from '../domain/RestaurantList.ts';
import { $, shortenString } from '../utils';

class RestaurantDetail extends HTMLElement {
  attributeChangedCallback(name) {
    if (
      name === 'category' &&
      name === 'name' &&
      name === 'distance' &&
      name === 'isFavorite'
    ) {
      this.connectedCallback();
    }
  }

  closeModalEvent() {
    this.shadowRoot
      .querySelector('#cancelModal')
      .addEventListener('click', () => {
        $('restaurant-detail-modal').closeModal();
      });
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
  }

  deleteClickEvent() {
    const { name } = this.getInformation();
    this.shadowRoot
      .querySelector('#deleteRestaurant')
      .addEventListener('click', () => {
        $('#deleteQuestionModal').openModal();
        $('#deleteQuestionModal').setDeleteName(name);
      });
  }

  update(restaurant) {
    this.setInformation(restaurant);
    this.render(restaurant);
    this.setComponentStyle();
    this.favoriteClickEvent();
    this.closeModalEvent();
    this.deleteClickEvent();
  }

  favoriteClickEvent() {
    this.shadowRoot
      .querySelector('favorite-image')
      .addEventListener('click', (event) => {
        event.stopPropagation();
        const restaurant = this.getInformation();
        RestaurantList.updateFavorite(restaurant.name);
        $('restaurant-boxes').drawRestaurants();
        this.update({ ...restaurant, isFavorite: !restaurant.isFavorite });
      });
  }

  setInformation(restaurant) {
    const { name, category, distance, description, link, isFavorite } =
      restaurant;

    this.setAttribute('name', name);
    this.setAttribute('category', category);
    this.setAttribute('distance', distance);
    this.setAttribute('description', description);
    this.setAttribute('link', link);
    this.setAttribute('isFavorite', isFavorite);
  }

  getInformation() {
    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description');
    const link = this.getAttribute('link');
    const isFavorite = this.getAttribute('isFavorite');

    return {
      name,
      category,
      distance,
      description,
      link,
      isFavorite: isFavorite === 'true',
    };
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

  render(restaurant) {
    const { name, category, distance, description, link, isFavorite } =
      restaurant;

    this.shadowRoot.innerHTML = `
    <div class="container fixed-size">
      <div class="wrapper">
      <div class="image-container">
        <category-image category="${category}"></category-image>
        <favorite-image isFavorite="${isFavorite}"></favorite-image>
      </div>
       <h3 class="m-4 text-title-2" title="${name}">${shortenString(
      name,
      19
    )}</h3>
       <span class="m-4 distance text-body">캠퍼스부터 ${distance}분 내</span>
       <p class="m-4 text-body description scrollbar-hide">${description}</p>
       <a class="m-4 text-body link" title="${link}" href="${link}" target="_blank">${shortenString(
      link,
      25
    )}</a>
    </div>
      <div class="button-container">
        <lunch-button
          name="삭제하기"
          id="deleteRestaurant"
          color="white"
        ></lunch-button>
        <lunch-button
          name="닫기"
          id="cancelModal"
          color="orange"
        ></lunch-button>
      </div>
    </div>
    `;
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
    .text-body {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }

    .text-title-2{
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
    }

    m-4{
      margin: 16px 0;
    }

    .container{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      position: fixed;
      width: 100%;
      height:700px;
      max-width:390px;
      bottom: 0;
      padding: 32px 16px;
      border-radius: 8px 8px 0px 0px;
      background: var(--grey-100);
      z-index:3;
    }

    .fixed-size{
      -webkit-box-sizing: border-box; 
      -moz-box-sizing: border-box;    
      box-sizing: border-box;    
    }

    .button-container {
      display: flex;
      justify-content:space-between;
      align-items:center;
      margin-top:32px;
    }

    .button-container:first-child {
      margin-right:16px;
    }

    .image-container{
      display:flex;
      justify-content:space-between;
    }
    
    .distance {
      color: var(--primary-color);
    }
    

    .description{
      height:350px;
      overflow-y:scroll;
      overflow-wrap: break-word;
    }

    .scrollbar-hide{
      -ms-overflow-style: none; 
      scrollbar-width: none;
    }

    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    .link{
      color:var(--grey-500);
      overflow-wrap: break-word;
    }

    @media (max-height: 700px) {
      .container {
        height:550px;
      }

      .description{
        height:200px;
      }
    }

  `;

    this.shadowRoot.append(componentStyle);
  }
}

export default RestaurantDetail;
