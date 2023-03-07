import { $ } from '../utils';

class AddRestaurantModal extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .text-title {
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
      }

      .modal {
          display: none;
          overflow-x:hidden;
        }
      
      .modal--open {
        display: block;
        overflow-x:hidden;
      }
      
      .backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.35);
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

      @media (max-height: 800px) {
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
        <div id="modal" class="modal" alt="modal">
        <div id="modalBackdrop" class="backdrop"></div>
        <div class="container">
          <h2 class="title text-title">새로운 음식점</h2>
          <form id="restaurantForm">
            <add-select
              name="카테고리"
              id="category"
              options="한식,중식,일식,양식,아시안,기타"
            ></add-select>
            <add-text-input name="이름" id="name"></add-text-input>
            <add-select
              name="거리(도보 이동 시간)"
              id="distance"
              options="5,10,15,20,30"
            ></add-select>
            <add-text-input
              name="설명"
              id="description"
              caption="메뉴 등 추가 정보를 입력해 주세요."
            ></add-text-input>
            <add-text-input
              name="참고 링크"
              id="link"
              caption="매장 정보를 확인할 수 있는 링크를 입력해 주세요."
            ></add-text-input>
            <div class="button-container">
              <lunch-button
                name="취소하기"
                id="cancleModal"
                color="white"
              ></lunch-button>
              <lunch-button
                name="추가하기"
                id="addRestraunt"
                color="orange"
              ></lunch-button>
          </form>
        </div>
      </div>
    `;

    this.shadowRoot.append(componentStyle);

    this.closeModalEvent();
  }

  closeModal() {
    $('add-restaurant-modal').modalOpen(false);
    $('body').classList.remove('scroll-hidden');
  }

  closeModalEvent() {
    this.shadowRoot
      .querySelector('#cancleModal')
      .addEventListener('click', () => {
        this.closeModal();
      });

    this.shadowRoot
      .querySelector('#modalBackdrop')
      .addEventListener('click', () => {
        this.closeModal();
      });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
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

    return { category, name, distance, description, link };
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

  modalOpen(isOpen) {
    if (isOpen) {
      this.shadowRoot.querySelector('#modal').classList.add('modal--open');
      return;
    }
    this.shadowRoot.querySelector('#modal').classList.remove('modal--open');
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

export default AddRestaurantModal;
