import { LOCAL_STORAGE_KEY } from '../constants/index.ts';
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

        const restaurants = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
        );

        const updatedRestaurants = [...restaurants, restaurant];

        const restaurantsString = JSON.stringify(updatedRestaurants);
        window.localStorage.setItem(LOCAL_STORAGE_KEY, restaurantsString);
        this.resetForm();

        $('#addRestaurantModal').closeModal();

        $('restaurant-boxes').drawRestaurants();
      });
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .text-title {
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
      }

      .container {
        position: fixed;
        width: 100%;
        bottom: 0;
        max-width: 360px;
        padding: 32px 16px;
        border-radius: 8px 8px 0px 0px;
        background: var(--grey-100);
      }
      
      .title {
        margin-bottom: 36px;
      }

      .button-container {
        display: flex;
        justify-content:space-between;
        align-items:center;
      }

      @media (max-width: 500px) {
        .container {
          position: fixed;
          top:100px;
          width:90vw;
          overflow-x:hidden;
          bottom: 0;
          border-radius: 8px 8px 0px 0px;
          background: var(--grey-100);
          overflow-y:scroll;
        }
      }

      @media (max-height: 900px) {
        .container {
          position: fixed;
          top:100px;
          width:90vw;
          overflow-x:hidden;
          bottom: 0;
          border-radius: 8px 8px 0px 0px;
          background: var(--grey-100);
          overflow-y:scroll;
        }
      }

`;

    this.shadowRoot.innerHTML = `
        <div class="container">
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

    this.shadowRoot.append(componentStyle);
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

  resetForm() {
    this.shadowRoot
      .querySelectorAll('add-text-input')
      .forEach((element) => element.reset());
    this.shadowRoot
      .querySelectorAll('add-select')
      .forEach((element) => element.reset());
  }
}

export default AddRestaurantForm;
