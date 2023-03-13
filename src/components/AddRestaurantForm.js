import RestaurantList from '../domain/RestaurantList.ts';
import { $ } from '../utils';

class AddRestaurantForm extends HTMLElement {
  addRestaurantEvent() {
    this.shadowRoot
      .querySelector('#addRestraunt')
      .addEventListener('click', (event) => {
        event.preventDefault();

        const { category, name, distance, description, link } =
          this.getFormValues();

        if (this.isError()) {
          return;
        }

        const restaurant = {
          category,
          name,
          distance,
          description,
          link,
        };

        const restaurants = RestaurantList.getLocalStorage();
        const isDuplicate =
          restaurant.length > 0
            ? restaurants.find((res) => res.name === name)
            : false;

        if (isDuplicate) {
          this.shadowRoot
            .querySelector('#name')
            .showErrorMessage('음식점 목록에 이미 존재하는 식당입니다.');
          return;
        }

        RestaurantList.add(restaurant);

        this.resetForm();

        $('#addRestaurantModal').closeModal();

        $('restaurant-boxes').drawRestaurants();
      });
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.addRestaurantEvent();
    this.closeModalEvent();
  }

  closeModalEvent() {
    this.shadowRoot
      .querySelector('#cancelModal')
      .addEventListener('click', () => {
        $('add-restaurant-modal').closeModal();
      });
  }

  getFormValues() {
    const category = this.shadowRoot
      .querySelector('#category')
      .getSelectValue();
    const name = this.shadowRoot.querySelector('#name').getTextValue();
    const distance = this.shadowRoot
      .querySelector('#distance')
      .getSelectValue();
    const description = this.shadowRoot
      .querySelector('#description')
      .getTextValue();
    const link = this.shadowRoot.querySelector('#link').getTextValue();

    return { category, name, distance, description, link, isFavorite: false };
  }

  isError() {
    const categoryError = this.shadowRoot.querySelector('#category').isError();
    if (categoryError) {
      this.shadowRoot.querySelector('#category').showErrorMessage();
      return true;
    }

    const nameError = this.shadowRoot.querySelector('#name').getErrorKind();
    if (nameError) {
      this.shadowRoot.querySelector('#name').showErrorMessage(nameError);
      return true;
    }

    const distanceError = this.shadowRoot.querySelector('#distance').isError();
    if (distanceError) {
      this.shadowRoot.querySelector('#distance').showErrorMessage();
      return true;
    }

    const descriptionError = this.shadowRoot
      .querySelector('#description')
      .getErrorKind();
    if (descriptionError) {
      this.shadowRoot
        .querySelector('#description')
        .showErrorMessage(descriptionError);
      return true;
    }

    const linkError = this.shadowRoot.querySelector('#link').getErrorKind();
    if (linkError) {
      this.shadowRoot.querySelector('#link').showErrorMessage(linkError);
      return true;
    }

    return false;
  }

  render() {
    this.shadowRoot.innerHTML = `
        <div class="container scrollbar-hide fixed-size">
          <h2 class="title text-title">새로운 음식점</h2>
          <form id="restaurantForm">
            <add-select
              name="카테고리"
              id="category"
              options="한식,중식,일식,양식,아시안,기타"
            ></add-select>
            <name-input name="이름" id="name"></name-input>
            <add-select
              name="거리(도보 이동 시간)"
              id="distance"
              options="5,10,15,20,30"
            ></add-select>
            <description-input
              name="설명"
              id="description"
              caption="메뉴 등 추가 정보를 입력해 주세요."
            ></description-input>
            <link-input
              name="참고 링크"
              id="link"
              caption="매장 정보를 확인할 수 있는 링크를 입력해 주세요."
            ></link-input>
            <div class="button-container">
              <lunch-button
              name="취소하기"
              id="cancelModal"
              color="white"
              ></lunch-button>
              <lunch-button
              name="추가하기"
              id="addRestraunt"
              color="orange"
              ></lunch-button>
            </div>
            </form>
        </div>
    `;
  }

  resetForm() {
    this.shadowRoot.querySelector('#name').reset();
    this.shadowRoot.querySelector('#description').reset();
    this.shadowRoot.querySelector('#link').reset();
    this.shadowRoot
      .querySelectorAll('add-select')
      .forEach((element) => element.reset());
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .text-title {
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
      }

      .container {
        position: fixed;
        bottom: 0;
        width:100%;
        max-width:390px;
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
      
      .title {
        margin-bottom: 36px;
      }

      .button-container {
        display: flex;
        justify-content:space-between;
        align-items:center;
      }

      .button-container:first-child {
        margin-right:16px;
      }

      .scrollbar-hide{
        -ms-overflow-style: none; 
        scrollbar-width: none;
      }
  
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      @media (max-height: 900px) {
        .container {
          top:100px;
          overflow-x:hidden;
          overflow-y:scroll;
        }
      }

`;

    this.shadowRoot.append(componentStyle);
  }
}

export default AddRestaurantForm;
