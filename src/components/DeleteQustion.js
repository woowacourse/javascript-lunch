import RestaurantList from '../domain/RestaurantList.ts';
import { $ } from '../utils';

class DeleteQustion extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.cancleClickEvent();
    this.deleteClickEvent();
  }

  cancleClickEvent() {
    this.shadowRoot.querySelector('#cancel').addEventListener('click', () => {
      $('#deleteQuestionModal').closeModal();
    });
  }

  deleteRestaurant() {
    const name = this.getAttribute('name');
    RestaurantList.delete(name);
    $('#deleteQuestionModal').closeModal();
    $('#openDetail').closeModal();
    $('restaurant-boxes').drawRestaurants();
  }

  deleteClickEvent() {
    this.shadowRoot
      .querySelector('#deleteRestaurant')
      .addEventListener('click', () => {
        this.deleteRestaurant();
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
    <div class="check-modal fixed-size">
        <h3 class="check-text">정말 삭제하시겠습니까?</h3>
        <div class="button-container">
            <lunch-button
                name="예"
                id="deleteRestaurant"
                color="orange"
            ></lunch-button>
            <lunch-button
                name="아니오"
                id="cancel"
                color="white"
            ></lunch-button>
        </div>
    </div>`;
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
    .button-container {
        display: flex;
        justify-content:space-between;
        align-items:center;
        width:100%;
    }

    .button-container:first-child {
        margin-right:16px;
    }

    .check-modal {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 200px;
        max-width: 390px;
        padding: 16px;
        border-radius: 8px;
        transform: translate(-50%, -50%);
        background-color: var(--grey-100);
        z-index:3;
      }

      .fixed-size{
        -webkit-box-sizing: border-box; 
        -moz-box-sizing: border-box;    
        box-sizing: border-box;    
      }
      
      .check-text {
        margin-bottom: 32px;
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
      }
    `;

    this.shadowRoot.append(componentStyle);
  }

  setDeleteName(name) {
    this.setAttribute('name', name);
  }
}

export default DeleteQustion;
